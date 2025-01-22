import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './entities/order-items.entity';
import { OrderEntity } from './entities/order.entity';
import { UserAddressEntity } from '../user/entities/address.entity';
import { BasketService } from '../basket/basket.service';
import { BasketModule } from '../basket/basket.module';
import { DiscountModule } from '../discount/discount.module';

@Module({
  imports:[TypeOrmModule.forFeature([OrderItemsEntity,OrderEntity,UserAddressEntity]),BasketModule,DiscountModule],
  controllers: [OrderController],
  providers: [OrderService,BasketService],
})
export class OrderModule {}
