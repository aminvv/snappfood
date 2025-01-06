import { BadGatewayException, BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CheckSupplierOtpDto, SupplementaryInformationDto,  SupplierSignupDto } from './dto/supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';
import { randomInt } from 'crypto';
import { SupplierOtpEntity } from './entities/suplier-otp.entity';
import { TokenService } from '../auth/token.service';
import { REQUEST } from "@nestjs/core";
import { Request } from 'express';
import { SupplierStatus } from './enums/status.enum';
import multer, { Multer } from 'multer';
import { TypeUploadDoc } from './types/uploadedDoc.type';
import { S3Service } from '../s3/s3.service';

@Injectable({ scope: Scope.REQUEST })
export class SupplierService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(SupplierEntity) private supplierRepository: Repository<SupplierEntity>,
    @InjectRepository(SupplierOtpEntity) private supplierOtpRepository: Repository<SupplierOtpEntity>,
    private categoryService: CategoryService,
    private tokenService: TokenService,
    private s3Service: S3Service,
  ) { }
  async signup(supplierSignupDto: SupplierSignupDto) {
    const { categoryId, city, invite_code, manager_family, manager_name, phone, store_name } = supplierSignupDto
    const supplier = await this.supplierRepository.findOneBy({ phone })
    if (supplier) throw new ConflictException("account already exist")
    const category = await this.categoryService.findById(categoryId)
    let agent: SupplierEntity = null
    if (invite_code) {
      agent = await this.supplierRepository.findOneBy({ invite_code })
    }
    const mobileNumber = parseInt(phone)
    const account = this.supplierRepository.create({
      city,
      manager_family,
      manager_name,
      phone,
      store_name,
      categoryId: category.id,
      agentId: agent?.id ?? null,
      invite_code: mobileNumber.toString(32).toUpperCase(),
    });
    await this.supplierRepository.save(account)
    const code = await this.createOtpForSupplier(account)
    return {
      code
    }

  }


  async createOtpForSupplier(supplier: SupplierEntity) {
    const expiresIn = new Date(new Date().getTime() + 1000 * 60 * 5)
    const code = randomInt(10000, 99999).toString()
    let supplierOtp = await this.supplierOtpRepository.findOneBy({ supplierId: supplier.id })
    if (!supplierOtp) {
      supplierOtp = this.supplierOtpRepository.create({
        code,
        expires_In: expiresIn,
        supplierId: supplier.id
      });
    } else {
      if (supplierOtp.expires_In < new Date()) {
        throw new BadGatewayException("supplierOtpCode expired");
      }
      supplierOtp.code = code;
      supplierOtp.expires_In = expiresIn;
    }
    await this.supplierOtpRepository.save(supplierOtp);
    supplier.supplier_otpId = supplierOtp.id;
    await this.supplierRepository.save(supplier);
    return {
      code
    }


  }

  async checkSupplierOtp(checkSupplierOtpDto: CheckSupplierOtpDto) {
    const { code, phone } = checkSupplierOtpDto
    const supplier = await this.supplierRepository.findOne({
      where: { phone },
      relations: {
        supplierOtp: true
      }
    })
    if (!supplier) throw new NotFoundException("Not  found User")
    const supplierOtp = supplier.supplierOtp  
    if (supplierOtp.code !== code) throw new BadRequestException("code not matching") 
    if (supplierOtp.expires_In < new Date()) throw new BadRequestException("supplier Otp code expires")
    if (!supplier.supplier_Phone_verify) {
      await this.supplierRepository.update({ id: supplier.id }, { supplier_Phone_verify: true })
    }
    const supplierAccessToken=await this.tokenService.createAccessTokenForSupplier({id:supplier.id,mobile:supplier.phone})
    const supplierRefreshToken=await this .tokenService.refreshTokenForSupplier({id:supplier.id,mobile:supplier.phone})
    return{
     message: "login successfully",
     supplierAccessToken,
     supplierRefreshToken,
    }
  }

  async saveSupplementaryInformation(infoDto:SupplementaryInformationDto){
    const{id}=this.request?.supplier
    const{email,national_code}=infoDto
    let supplier=await this.supplierRepository.findOneBy({national_code})
    if(supplier && supplier.id !== id ){
      throw new ConflictException("national code already used")
    }
    supplier=await this.supplierRepository.findOneBy({email})
    if(supplier && supplier.id !== id ){
      throw new ConflictException("email already used")
    }
    await this.supplierRepository.update({id},{
      national_code,
      email,
      status:SupplierStatus.SupplementaryInformation
    })
    return{
      message:"updated information successfully"
    }
  }

  async uploadedDocument(files:TypeUploadDoc){
    const{id}=this.request?.supplier
    const {acceptedDoc,image}=files
    const supplier=await this.supplierRepository.findOneBy({id})
    const imageResult=await this.s3Service.uploadFile(image[0],"imageDoc")
    const acceptedDocResult=await this.s3Service.uploadFile(acceptedDoc[0],"acceptedDoc")
    if(imageResult)supplier.image=imageResult.Location
    if(acceptedDocResult)supplier.acceptedDoc=acceptedDocResult.Location
    supplier.status=SupplierStatus.UploadedDocument
    await this.supplierRepository.save(supplier)
    return{
      message:"upload SuccessFully"
    }
  }
}
