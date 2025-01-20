import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { BasketDto, DiscountBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBasketEntity } from './entities/user-basket.entity';
import { Code, IsNull, Not, Repository } from 'typeorm';
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

  async getBasket() {
    const { id: userId } = this.request.user
    const basketItem = await this.userBasketRepository.find({
      relations: {
        discount: true,
        food: {
          supplier: true
        },
      },
      where: { userId }
    })
    const foods = basketItem.filter((item) => item.foodId)
    const supplierDiscounts = basketItem.filter((item) => item?.discount?.supplierId)
    const generalDiscount = basketItem.find((item) => item?.discount?.id && !item?.discount?.supplierId)

    let total_amount = 0
    let payment_amount = 0
    let total_discount_amount = 0
    let food_list = []

    for (const item of foods) {
      const { food, count } = item
      total_amount += food.price * count
      let discount_amount = 0
      const supplierId = food.supplierId
      let discount_code: number = null
      const discount_SupplierId = food.supplierId
      const discount_price = food.price
      let foodPrice = food.price * count
      if (food.is_active && food.discount > 0) {
        discount_amount += foodPrice * (food.discount / 100)
        foodPrice = foodPrice - foodPrice * (food.discount / 100)
      }
      const discountItem = supplierDiscounts.find(({ discount }) => discount.supplierId === supplierId)
      if (discountItem) {
        const { discount: { active, amount, code, percent, limit, usage } } = discountItem
        if (active) {
          if (!limit || limit && limit > usage) {
            discount_code = code
            if (percent && percent > 0) {
              discount_amount += foodPrice * (percent / 100)
              foodPrice = foodPrice - foodPrice * (percent / 100)
            } else if (amount && amount > 0) {
              discount_amount = amount
              foodPrice = amount > foodPrice ? 0 : foodPrice - amount
            }
          }
        }
      }
      payment_amount += foodPrice
      total_discount_amount += discount_amount
      food_list.push({
        name: food.name,
        description: food.description,
        count,
        image: food.image,
        price: foodPrice,
        total_amount: food.price * count,
        discount_amount,
        payment_amount: foodPrice,
        discount_code,
        supplier_name: food.supplier.store_name,
        supplier_image: food.supplier.image,
        supplierId,
      })
    }

    let generalDiscountDetail = {}
    if (generalDiscount?.discount?.active) {
      const { discount } = generalDiscount
      if (discount.limit && discount.limit > discount.usage) {
        let discount_amount = 0
        if (discount.percent > 0) {
          discount_amount = payment_amount * (discount.percent / 100)
        } else if (discount.amount > 0) {
          discount_amount = discount.amount
          payment_amount = discount_amount > payment_amount ? 0 : payment_amount - discount_amount
          total_discount_amount = discount_amount
        }
        generalDiscountDetail = {
          code: discount.code,
          percent: discount.percent,
          amount: discount.amount,
          discount_amount,

        }
      }
    }
    return {
      total_amount,
      total_discount_amount,
      payment_amount,
      food_list,
      generalDiscountDetail,
    }
  }



  async addDiscount(discountBasketDto: DiscountBasketDto) {
    const { code } = discountBasketDto
    const { id:userId}=this.request.user
    const discount = await this.discountService.findOneByCode(code)

    if(!discount.active)throw new BadRequestException(" this is discount code is not active")
    if(discount.limit && discount.limit<=discount.usage)throw new BadRequestException("the capacity of this discount code is full")
    if(discount?.expiresIn && discount?.expiresIn?.getTime()<= new Date().getTime())throw new BadRequestException("this discount code is expired")



    const userBasketDiscount=await this.userBasketRepository.findOne({where:{discountId:discount.id,userId}})
    if(userBasketDiscount)throw new BadRequestException("already used discount")
    
    if (discount.supplierId) {

      const discountsOfSupplier=await  this.userBasketRepository.findOne({
        relations:{
          discount:true
        },
        where:{
          userId,
          discount:{
            supplierId:discount.supplierId
          }
        }
      })
      if(discountsOfSupplier){
        throw new BadRequestException(" you can not use several of supplier discount")
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
    }else if( !discount.supplierId){
      const generalDiscount=await this.userBasketRepository.findOne({
        relations:{
          discount:true
        },
        where:{
          userId,
          discount:{
            id:Not(IsNull()),
            supplierId:IsNull()
          }
        }
      })
      if(generalDiscount)throw new BadRequestException("already used general discount")
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
    if (userBasket) {
      await this.userBasketRepository.update(userBasket.id, {
        discountId: discount.id,
      });
    } else {
      await this.userBasketRepository.insert({
        discountId: discount.id,
        foodId: userBasket.foodId,
        count: userBasket.count,
        userId,
      });
    }
    return{
      message:"you added discount code successfully"
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




}
