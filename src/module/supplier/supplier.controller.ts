import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CheckSupplierOtpDto, SupplementaryInformationDto, SupplierSignupDto, UploadDocDto } from './dto/supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { swaggerConsumes } from 'src/common/enums/swaggerConsumes.enum';
import { SupplierAuth } from 'src/common/decorator/auth.decorator';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { documentFileFields } from 'src/common/interceptors/upload -file.interceptor';

@Controller('supplier')
@ApiTags('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

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
  @Post('/supplementary-information-supplier')
  @ApiConsumes(swaggerConsumes.UrlEncoded)
  @SupplierAuth()
  saveSupplementaryInformation(@Body() supplementaryInformationDto: SupplementaryInformationDto) {
    return this.supplierService.saveSupplementaryInformation(supplementaryInformationDto);
  }


  @Put("/uploadDocuments")
  @SupplierAuth()
  @ApiConsumes(swaggerConsumes.MultiPartData)
  @UseInterceptors(documentFileFields([
    { name: "acceptedDoc", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]))
  uploadedDocument(@Body() uploadDocDto: UploadDocDto, @UploadedFiles() files: any) {
    return this.supplierService.uploadedDocument(files)

  }


}
