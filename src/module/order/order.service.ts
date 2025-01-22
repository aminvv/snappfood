import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { BasketType } from '../basket/types/basket.type';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemsEntity } from './entities/order-items.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { UserAddressEntity } from '../user/entities/address.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from './enum/status.enum';


@Injectable({scope:Scope.REQUEST})
export class OrderService {
  constructor(
    @Inject(REQUEST)private request:Request,
    @InjectRepository(UserAddressEntity)private userAddressRepository:Repository<UserAddressEntity>,
    private datasource:DataSource
  ){}
  async create(basketType: BasketType,userAddressId:number,description:string) {
    const queryRunner=this.datasource.createQueryRunner()
     await queryRunner.connect()
    try {
      const{id:userId}=this.request.user
      const {payment_amount,total_amount,food_list,total_discount_amount}=basketType
      const address=await this.userAddressRepository.findOneBy({id:userAddressId,userId})
      if(!address)throw new NotFoundException("not found address")
        let order=await queryRunner.manager.create(OrderEntity,{
          addressId:userAddressId,
          description,
          total_amount,
           userId,
           payment_amount,
           discount_amount:total_discount_amount,
           status:OrderStatus.Pending,
      })
      order=await queryRunner.manager.save(OrderEntity,order)
      let orderItem:DeepPartial<OrderItemsEntity>[]=[]
      for (const item of food_list){
        orderItem.push({
          count:item.count,
          orderId:order.id,
          foodId:item.foodId,
          supplierId:item.supplierId,
          status:OrderStatus.Pending
        })
        if(orderItem.length>0){
          await queryRunner.manager.insert(OrderItemsEntity,orderItem)
        }else{
          throw new BadRequestException(" your food list is empty")
        }
      }
      await queryRunner.commitTransaction()
      await queryRunner.release()
      return{
        message:"create Order"
      }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      await queryRunner.release()
      throw error
    }
    
  }


}
