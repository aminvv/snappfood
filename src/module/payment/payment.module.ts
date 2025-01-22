import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasketService } from '../basket/basket.service';
import { UserBasketEntity } from '../basket/entities/user-basket.entity';
import { AuthModule } from '../auth/auth.module';
import { DiscountEntity } from '../discount/entities/discount.entity';
import { MenuService } from '../menu/service/menu.service';
import { MenuEntity } from '../menu/entities/menu.entity';
import { MenuTypeEntity } from '../menu/entities/menu-type.entity';
import { MenuTypeService } from '../menu/service/menu-type.service';
import { OrderEntity } from '../order/entities/order.entity';
import { S3Service } from '../s3/s3.service';
import { ZarinnpalService } from '../http/zarinnpal.service';
import { HttpApiModule } from '../http/http.module';
import { DiscountService } from '../discount/discount.service';
import { OrderItemsEntity } from '../order/entities/order-items.entity';
import { UserAddressEntity } from '../user/entities/address.entity';
import { OrderService } from '../order/order.service';
import { BasketModule } from '../basket/basket.module';

@Module({
    imports:[AuthModule,HttpApiModule,TypeOrmModule.forFeature([
      PaymentEntity,
      UserBasketEntity,
      DiscountEntity,
      MenuEntity,
      MenuTypeEntity,
      OrderEntity,
      OrderItemsEntity,
      UserAddressEntity,

    ]),BasketModule],
  controllers: [PaymentController],
  providers: [PaymentService,
    BasketService,
    ZarinnpalService,
    DiscountService,
    MenuService,
    MenuTypeService,
    S3Service,
    OrderService,
  ],
})
export class PaymentModule {}
