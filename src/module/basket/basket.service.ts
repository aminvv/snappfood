import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { BasketDto, DiscountBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBasketEntity } from './entities/user-basket.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { MenuEntity } from '../menu/entities/menu.entity';
import { MenuService } from '../menu/service/menu.service';
import { DiscountService } from '../discount/discount.service';
import { DiscountEntity } from '../discount/entities/discount.entity';

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(UserBasketEntity) private userBasketRepository: Repository<UserBasketEntity>,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
    @InjectRepository(DiscountEntity) private discountRepository: Repository<DiscountEntity>,
    private discountService: DiscountService,
  ) { }
  async addToBasket(BasketDto: BasketDto) {
    const { id: userId } = this.request.user
    const { foodId } = BasketDto
    const food = await this.menuRepository.findOneBy({ id: foodId });
    if (!food) {
      throw new Error('Food item not found');
    }
    let basketItem = await this.userBasketRepository.findOne({
      where: { foodId, userId }
    })
    if (basketItem) basketItem.count += 1
    else {
      basketItem = this.userBasketRepository.create({
        foodId,
        userId,
        count: 1
      })
    }
    await this.userBasketRepository.save(basketItem)
    return {
      message: "added food to your basket"
    }
  }

  async addDiscount(discountBasketDto: DiscountBasketDto) {
    const { id: userId } = this.request.user
    const { code } = discountBasketDto
    const discount = await this.discountService.findOneByCode(code)

      const userBasketDiscount = await this.userBasketRepository.findBy({ discountId: discount.id, userId })
    if (userBasketDiscount) throw new BadRequestException("already used discount ")
    if (discount.supplierId) {
      const discountsOfSupplier = await this.userBasketRepository.findOne({
        relations: {
          discount: true
        },
        where: {
          userId,
          discount: {
            supplierId: discount.supplierId
          }
        }
      })
      if (discountsOfSupplier) {
        throw new BadRequestException("you can not user several of supplier discount")
      }
      const userBasket = await this.userBasketRepository.findOne({
        relations: {
          food: true
        },
        where: {
          userId,
          food: {
            supplierId: discount.supplierId
          }
        }
      })
      if (!userBasket) {
        throw new BadRequestException("you can not this discount code in basket")
      }
    }
    await this.userBasketRepository.insert({
      discountId: discount.id,
      userId,
    })
    return {
      message: "you added discount code successfully"
    }
  }
  async removeDiscount(discountBasketDto: DiscountBasketDto) {
    const { id: userId } = this.request.user
    const { code } = discountBasketDto
    const discount = await this.discountService.findOneByCode(code)
    const basketDiscount = await this.userBasketRepository.findOne({

      where: {
        discountId: discount.id
      }
    })

    if (!basketDiscount) throw new NotFoundException("not found basket in discount")
    await this.userBasketRepository.delete({ discountId: discount.id, userId })
    return {
      message: "deleted discount code successfully"
    }
  }

  findAll() {
    return `This action returns all basket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  async removeFromBasket(basketDto: BasketDto) {
    const { id: userId } = this.request.user
    const { foodId } = basketDto
    await this.menuRepository.findOneBy({ id: foodId })
    let basketItem = await this.userBasketRepository.findOne({ where: { foodId, userId } })
    if (basketItem) {
      if (basketItem.count <= 1) {
        await this.userBasketRepository.delete(basketItem.id)
      } else {
        basketItem.count -= 1
        await this.userBasketRepository.save(basketItem)
      }
      return {
        message: " remove item from basket"
      }
    }
    throw new NotFoundException("not found food item in basket")
  }
}
