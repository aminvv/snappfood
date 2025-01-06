import { Module } from '@nestjs/common';
import { MenuService } from './service/menu.service';
import { MenuController } from './menu.controller';
import { MenuEntity } from './entities/menu.entity';
import { FeedbackEntity } from './entities/feedback.entity';
import { TypeEntity } from './entities/type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeService } from './service/type.service';
import { FeedbackService } from './service/feedback.service';

@Module({
    imports:[TypeOrmModule.forFeature([MenuEntity,FeedbackEntity,TypeEntity])],
  controllers: [MenuController],
  providers: [MenuService,TypeService,FeedbackService],
})
export class MenuModule {}
