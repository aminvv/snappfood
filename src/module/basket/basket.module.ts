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
import { DiscountService } from '../discount/discount.service';
import { MenuEntity } from '../menu/entities/menu.entity';
import { MenuTypeEntity } from '../menu/entities/menu-type.entity';
import { DiscountModule } from '../discount/discount.module';


@Module({
  imports:[TypeOrmModule.forFeature([UserBasketEntity,DiscountEntity,MenuEntity,MenuTypeEntity,]),AuthModule,MenuModule,S3Module,DiscountModule],
  controllers: [BasketController],
  providers: [BasketService,MenuService,DiscountService],
})
export class BasketModule {}
