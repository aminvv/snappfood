import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBasketEntity } from './entities/user-basket.entity';
import { DiscountEntity } from '../discount/entities/discount.entity';
import { AuthModule } from '../auth/auth.module';
import { MenuService } from '../menu/service/menu.service';
import { MenuModule } from '../menu/menu.module';
import { S3Module } from '../s3/s3.module';


@Module({
  imports:[TypeOrmModule.forFeature([UserBasketEntity,DiscountEntity]),AuthModule,MenuModule,S3Module],
  controllers: [BasketController],
  providers: [BasketService,MenuService],
})
export class BasketModule {}
