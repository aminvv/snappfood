import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { BasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBasketEntity } from './entities/user-basket.entity';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { MenuEntity } from '../menu/entities/menu.entity';
import { MenuService } from '../menu/service/menu.service';

@Injectable({ scope: Scope.REQUEST })
export class BasketService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(UserBasketEntity) private userBasketRepository: Repository<UserBasketEntity>,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
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
    let basketItem = await this.userBasketRepository.findOne({ where:  { foodId, userId } })
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
