import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CheckOtpDto, OtpDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Any, Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { OtpEntity } from '../user/entities/user-otp.entity';
import { TokensPayload } from './types/payloadToken';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async createAccessTokenForUser(payload: TokensPayload) {
        const tokenAccess = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_FOR_USER,
            expiresIn: "30d",
        })
        
        return tokenAccess
    }
    async refreshTokenForUser(payload: TokensPayload) {
        const refreshToken=this.jwtService.sign(payload,{
            secret:process.env.REFRESH_TOKEN_FOR_USER,
            expiresIn:"1y"
        })
        return refreshToken

    }
    async createAccessTokenForSupplier(payload: TokensPayload) {
        const tokenAccess = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_FOR_SUPPLIER,
            expiresIn: "30d",
        })
        
        return tokenAccess
    }
    async refreshTokenForSupplier(payload: TokensPayload) {
        const refreshToken=this.jwtService.sign(payload,{
            secret:process.env.REFRESH_TOKEN_FOR_SUPPLIER,
            expiresIn:"1y"
        })
        return refreshToken

    }

    async validationSupplierAccessToken(token:string){
        try {
            return this.jwtService.verify(token,{
                secret:process.env.ACCESS_TOKEN_FOR_SUPPLIER
            })
        } catch (error) {
            throw new UnauthorizedException("login again")
        }
    }
}
