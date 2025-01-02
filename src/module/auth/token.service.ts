import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CheckOtpDto, OtpDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Any, Repository } from 'typeorm';
import { JwtService } from "@nestjs/jwt";
import { OtpEntity } from '../user/entities/otp.entity';
import { TokensPayload } from './types/payloadToken';

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
    ) { }

    async createAccessToken(payload: TokensPayload) {
        const tokenAccess = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN,
            expiresIn: "30d",
        })
        
        return tokenAccess
    }
    async refreshToken(payload: TokensPayload) {
        const refreshToken=this.jwtService.sign(payload,{
            secret:process.env.REFRESH_TOKEN,
            expiresIn:"1y"
        })
        return refreshToken

    }
}
