import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Repository } from 'typeorm';
import { S3Service } from 'src/module/s3/s3.service';
import { MenuTypeService } from './menu-type.service';
import { CreateMenuItemDto } from '../dto/create-menu-item.dto';
import { MenuTypeEntity } from '../entities/menu-type.entity';

@Injectable({ scope: Scope.REQUEST })
export class MenuService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(MenuEntity) private menuRepository: Repository<MenuEntity>,
    @InjectRepository(MenuTypeEntity) private menuTypeRepository: Repository<MenuTypeEntity>,
    private s3Service: S3Service,
    private menuTypeService: MenuTypeService
  ) { }



  async createMenuitem(createMenuDto: CreateMenuItemDto, image: Express.Multer.File) {
    const { id } = this.request?.supplier;
    const { description, name, discount, price, typeId } = createMenuDto;
    const { Location, Key } = await this.s3Service.uploadFile(image, 'menuItem')
    const type = await this.menuTypeService.findOneById(typeId);
    let slugData=description??name
    slugData.replace(/[\s]+/g,"-").replace(/[^\w\u0600-\u06FF\-]/g, '').replace(/[\u200C]/g, '-')
    let item = this.menuRepository.create({
      name,
      description,
      discount,
      price,
      slug:slugData,
      image: Location,
      key: Key,
      typeId: type.id,
      supplierId: id
    });
    item = await this.menuRepository.save(item);
    return { item };
  }

  async findAll(slug: string) {
    return await this.menuRepository.find({
      where: { slug },
      relations: {
      type:true
      },

    })
  }


}
