import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BasketService } from '../basket/basket.service';
import { ZarinnpalService } from '../http/zarinnpal.service';
import { OrderService } from '../order/order.service';
import { paymentDataDto, PaymentDto } from './dto/payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';


@Injectable({scope:Scope.REQUEST})
export class PaymentService {
constructor(
  @Inject(REQUEST)private request:Request,
  @InjectRepository(PaymentEntity)private paymentRepository:Repository<PaymentEntity>,
  private basketService:BasketService,
  private orderService:OrderService,
  private zarinnpalService:ZarinnpalService
){}
async getWayUrl(paymentDto:PaymentDto){
  const{id:userId}=this.request.user
  const basket=await this.basketService.getBasket()
  const order=await this.orderService.create(basket,paymentDto)
  const payment=await this.create({
    amount:basket.payment_amount,
    orderId:order.id,
    status:basket.payment_amount===0,
    userId,
    invoice_number:new Date().getTime().toString()
  })
  if(payment.status){
    const{authority,code,gateWayUrl}=await this.zarinnpalService.sendRequest({
      amount:basket.payment_amount,
      description:"Payment Order",
      user:{email:'aminviper1378@gmail.com',mobile:'09104316251'}
    })
    payment.authority=authority
    await this.paymentRepository.save(payment)
    return{
      gateWayUrl,
      code,
    }
  }
  return {
    message:" payment successfully"
  }
}

async create (paymentDataDto:paymentDataDto){
  const{amount,invoice_number,orderId,status,userId}=paymentDataDto
  const payment=await this.paymentRepository.create({
    amount,
    invoice_number,
    orderId,
    userId,
    status,
  })
  return await this.paymentRepository.save(payment)
}

async verify (paymentDataDto:paymentDataDto){
  const{amount,invoice_number,orderId,status,userId}=paymentDataDto
  const payment=await this.paymentRepository.create({
    amount,
    invoice_number,
    orderId,
    userId,
    status,
  })
  return await this.paymentRepository.save(payment)
}
}
