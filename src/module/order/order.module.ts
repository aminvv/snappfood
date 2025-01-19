import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemsEntity } from './entities/order-items.entity';
import { OrderEntity } from './entities/order.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderItemsEntity,OrderEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
