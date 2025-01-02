import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { SupplierOtpEntity } from './entities/suplier-otp.entity';
import { CategoryService } from '../category/category.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports:[TypeOrmModule.forFeature([SupplierEntity,SupplierOtpEntity]),CategoryModule],
  controllers: [SupplierController],
  providers: [SupplierService],
})
export class SupplierModule {}
