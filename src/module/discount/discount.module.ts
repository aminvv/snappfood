import { Module } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscountEntity } from './entities/discount.entity';
import { UserBasketEntity } from '../basket/entities/user-basket.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DiscountEntity,UserBasketEntity]),],
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}
