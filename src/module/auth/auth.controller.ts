import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckOtpDto, OtpDto } from './dto/auth.dto';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
    @ApiConsumes(swaggerConsumes.UrlEncoded)
  @Post('/sendOtp')
  sendOtp(@Body() otpDto: OtpDto) {
    return this.authService.sendOtp(otpDto)

  }
  @Post('/checkOtp')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  checkOtp(@Body() checkOtDto: CheckOtpDto) {
    return this.authService.checkOtp(checkOtDto)

  }

}
