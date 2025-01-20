import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { SupplierModule } from '../supplier/supplier.module';
import { MenuModule } from '../menu/menu.module';
import { DiscountModule } from '../discount/discount.module';
import { BasketModule } from '../basket/basket.module';
import { PaymentModule } from '../payment/payment.module';
import { OrderModule } from '../order/order.module';
import { HttpApiModule } from '../http/http.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [ConfigModule.forRoot({envFilePath:join(process.cwd(),'.env'),isGlobal:true}),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AuthModule,
    UserModule,
    SupplierModule,
    CategoryModule,
    MenuModule,
    DiscountModule,
    BasketModule,
    PaymentModule,
    OrderModule,
    HttpModule,
    HttpApiModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
     


