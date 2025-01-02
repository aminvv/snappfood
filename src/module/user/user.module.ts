import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserAddressEntity } from './entities/address.entity';
import { OtpEntity } from './entities/user-otp.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,UserAddressEntity,OtpEntity])],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
 