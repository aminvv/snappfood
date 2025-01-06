import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Repository } from 'typeorm';
import { FeedbackEntity } from '../entities/feedback.entity';

@Injectable({ scope: Scope.REQUEST })
export class FeedbackService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(FeedbackEntity) private feedbackRepository: Repository<FeedbackEntity>
  ) { }



}
