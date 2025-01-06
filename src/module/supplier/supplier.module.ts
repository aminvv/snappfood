import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierOtpEntity } from './entities/suplier-otp.entity';
import { CategoryModule } from '../category/category.module';
import { TokenService } from '../auth/token.service';
import { AuthModule } from '../auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { S3Service } from '../s3/s3.service';

@Module({
  imports:[TypeOrmModule.forFeature([SupplierEntity,SupplierOtpEntity]),CategoryModule,AuthModule,JwtModule],
  controllers: [SupplierController],
  providers: [SupplierService,TokenService,JwtService,S3Service],
})
export class SupplierModule {}
