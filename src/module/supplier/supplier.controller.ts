import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto, SupplierSignupDto } from './dto/supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post('/signup')
    @ApiConsumes(swaggerConsumes.UrlEncoded)
  create(@Body() SupplierSignupDto: SupplierSignupDto) {
    return this.supplierService.signup(SupplierSignupDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(+id);
  }
}
