import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {  CheckSupplierOtpDto, SupplierSignupDto } from './dto/supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('/signup')
    @ApiConsumes(swaggerConsumes.UrlEncoded)
  signup(@Body() SupplierSignupDto: SupplierSignupDto) {
    return this.supplierService.signup(SupplierSignupDto);
  }
  @Post('/checkSupplierOtp')
    @ApiConsumes(swaggerConsumes.UrlEncoded)
    checkSupplierOtp(@Body() checkSupplierOtpDto: CheckSupplierOtpDto) {
    return this.supplierService.checkSupplierOtp(checkSupplierOtpDto);
  }


}
