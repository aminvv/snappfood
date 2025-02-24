import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { OtpEntity } from '../user/entities/user-otp.entity';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { UserGuard } from './guards/user-auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,OtpEntity]),UserModule,JwtModule],
  controllers: [AuthController],
  providers: [AuthService,TokenService,UserGuard],
  exports: [AuthService,TokenService,UserGuard,TypeOrmModule,JwtModule],
})
export class AuthModule {}
