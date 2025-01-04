import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CheckOtpDto, OtpDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { OtpEntity } from '../user/entities/user-otp.entity';
import { TokenService } from './token.service';
import { TokensPayload } from './types/payloadToken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(OtpEntity) private otpRepository: Repository<OtpEntity>,
        private tokenService: TokenService,
    ) { }
    async sendOtp(otpDto: OtpDto) {
        const { mobile } = otpDto;
        let user = await this.userRepository.findOneBy({ mobile });
        if (!user) {
            user = this.userRepository.create({ mobile });
            await this.userRepository.save(user);
        }
        const code = await this.createOtpForUser(user);
        await this.otpRepository.update({ userId: user.id }, { mobile: mobile })
        return code;
    }

    async checkOtp(checkOtp: CheckOtpDto) {
        const { code, mobile } = checkOtp
        const user = await this.userRepository.findOne({
            where:{ mobile },
            relations:{
                otp:true
            }
        })
        if (!user) throw new NotFoundException("Not  found User")
        if (code !== user?.otp.code) throw new BadRequestException("code not matching")
        if (user?.otp.expires_In < new Date()) {
            throw new BadRequestException("otp code  expired");
        }
        if(!user.mobile_verify){
            await this.userRepository.update({id:user.id},{mobile_verify:true})
        }
        const payload: TokensPayload = { userId: user.otp.userId, mobile: user.otp.mobile, };
        const accessToken =await this.tokenService.createAccessTokenForUser(payload)
        const refreshToken =await this.tokenService.refreshTokenForUser(payload)
        return {
            accessToken: accessToken.toString(),  refreshToken: refreshToken.toString(), message: 'You logged-in successfully',
        };

    }

    async createOtpForUser(user: UserEntity) {
        const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 2);
        const code = randomInt(10000, 99999).toString();
        let otp = await this.otpRepository.findOneBy({ userId: user.id })
        if (!otp) {
            otp = this.otpRepository.create({
                code,
                expires_In: expiresIn,
                userId: user.id

            })
        } else {

            otp.code = code,
                otp.expires_In = expiresIn

        }
        otp = await this.otpRepository.save(otp)
        user.otpId = otp.id;
        await this.userRepository.save(user);
        return code
    }
}
