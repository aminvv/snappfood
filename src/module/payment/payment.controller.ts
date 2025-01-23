import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UserAuth } from 'src/common/decorator/auth.decorator';
import { PaymentDto } from './dto/payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @UserAuth()
  getWayUrl(@Body() paymentDto: PaymentDto) {
    return this.paymentService.getWayUrl(paymentDto)
  }

@Get()
verifyPayment(@Query() query: any ){
  return this.paymentService.verify(query)
}
}
