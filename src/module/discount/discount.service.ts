import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import { DeepPartial, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class DiscountService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(DiscountEntity) private discountRepository: Repository<DiscountEntity>,

  ) { }
  async addDiscount(createDiscountDto: CreateDiscountDto) {
    const { amount, code, expiresIn, limit, percent, supplierId, usage } = createDiscountDto
    await this.checkExistCode(code)
    const discountObject: DeepPartial<DiscountEntity> = { code }
    if ((!percent && !amount) || (percent && amount)) {
      throw new BadRequestException("you  must enter one  of the amount or percent fields")
    }
    if (amount && !isNaN(parseFloat(amount.toString()))) {
      discountObject["amount"] = amount

    } else if (percent && !isNaN(parseFloat(percent.toString()))) {
      discountObject["percent"] = percent
    }
    if (expiresIn && !isNaN(parseInt(expiresIn.toString()))) {
      const time = 1000 * 60 * 60 * 24 * expiresIn
      discountObject["expiresIn"] = new Date(new Date().getTime() + time)
    }
    if (limit && !isNaN(parseInt(limit.toString()))) {
      discountObject["limit"] = limit
    }
    discountObject['supplierId'] = supplierId
    discountObject['usage'] = usage
    const discount = this.discountRepository.create(discountObject)
    await this.discountRepository.save(discount)
    return {
      message: "create discount successfully"
    }
  }


  async checkExistCode(code: number) {
    const discount = await this.discountRepository.findOneBy({ code })
    if (discount) throw new ConflictException("already exist code")
  }
  async findOneByCode(code: number) {
    const discount = await this.discountRepository.findOneBy({ code })
    if (!discount) throw new NotFoundException("not found discount code")
      return discount
  }

  async findAll() {
    return await this.discountRepository.find({})
  }


  async update(id: number, updateDiscountDto: UpdateDiscountDto) {
    const discount = await this.discountRepository.findOneBy({ id })
    if (discount) {
      const { amount, code, expiresIn, limit, percent, usage } = updateDiscountDto
      await this.checkExistCode(code)
      const discountObject: DeepPartial<DiscountEntity> = { code }
      if ((!percent && !amount) || (percent && amount)) {
        throw new BadRequestException("you  must enter one  of the amount or percent fields")
      }
      if (amount && !isNaN(parseFloat(amount.toString()))) {
        discountObject["amount"] = amount;
        discountObject["percent"] = null;
      } else if (percent && !isNaN(parseFloat(percent.toString()))) {
        discountObject["percent"] = percent;
        discountObject["amount"] = null;
      }
      if (expiresIn && !isNaN(parseInt(expiresIn.toString()))) {
        const time = 1000 * 60 * 60 * 24 * expiresIn
        discountObject["expiresIn"] = new Date(new Date().getTime() + time)
      }
      if (limit && isNaN(parseInt(limit.toString()))) {
        discountObject["limit"] = limit
      }
      discountObject['usage'] = usage
      await this.discountRepository.update({ id }, discountObject)
    } else { throw new NotFoundException("not found discount") }
    return {
      message: "update discount successfully"
    }
  }

  async remove(id: number) {
    const discount = await this.discountRepository.findOneBy({ id })
    if (discount) {
      await this.discountRepository.delete(id)
    }
    return {
      message: "discount delete successfully"
    }
  }
}
