import { Module } from '@nestjs/common';
import { MenuService } from './service/menu.service';
import { MenuController } from './controller/menu.controller';
import { MenuEntity } from './entities/menu.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { MenuTypeEntity, } from './entities/menu-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuTypeService,  } from './service/menu-type.service';
import { FeedbackService } from './service/feedback.service';
import { MenuTypeController } from './controller/menu-type.controller';
import { SupplierModule } from '../supplier/supplier.module';

@Module({
    imports:[TypeOrmModule.forFeature([MenuEntity,FeedbackEntity,MenuTypeEntity]),SupplierModule],
  controllers: [MenuController,MenuTypeController],
  providers: [MenuService,MenuTypeService,FeedbackService],
})
export class MenuModule {}
