import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSupplierDto, SupplierSignupDto } from './dto/supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierEntity } from './entities/supplier.entity';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { CategoryService } from '../category/category.service';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(SupplierEntity) private supplierRepository: Repository<SupplierEntity>,
    private categoryService: CategoryService,
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
  }

  findAll() {
  }

  findOne(id: number) {
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
  }

  remove(id: number) {
  }
}
