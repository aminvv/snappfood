import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BasketService } from '../basket/basket.service';
import { ZarinnpalService } from '../http/zarinnpal.service';


@Injectable({scope:Scope.REQUEST})
export class PaymentService {
constructor(
  @Inject(REQUEST)private request:Request,
  private basketService:BasketService,
  private zarinnpalService:ZarinnpalService
){}
async getWayUrl(){
  const{id:userId}=this.request.user
  const basket=await this.basketService.getBasket()
  return this.zarinnpalService.sendRequest({
    amount:basket.payment_amount,
    description:"Payment Order",
    user:{email:'aminviper1378@gmail.com',mobile:'09104316251'}
  })
}
}
