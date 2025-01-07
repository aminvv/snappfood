import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Repository } from 'typeorm';
import { MenuTypeEntity } from '../entities/menu-type.entity';
import { menuTypeDto } from '../dto/menu-type.dto';

@Injectable({ scope: Scope.REQUEST })
export class MenuTypeService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(MenuTypeEntity) private MenuTypeRepository: Repository<MenuTypeEntity>
  ) { }

  async create(menuTypeDto:menuTypeDto) {
    const { id } = this.request.supplier
    const{title}=menuTypeDto
    const supplier = await this.MenuTypeRepository.findOneBy({ supplierId: id })    
    if (supplier) throw new NotFoundException("supplier not found")
    const type = this.MenuTypeRepository.create({
      title: title,
      supplierId:id
    })
    await this.MenuTypeRepository.save(type)
    return{
      message:"create Successfully"
    }
  }

  async findAll(){
    const {id}=this.request?.supplier
    return await this.MenuTypeRepository.findAndCount({
      where:{supplierId:id},
      order:{id:"DESC"}
    })
  }

  async findOneById(id:number){
    const type=await this.MenuTypeRepository.findOneBy({id})
    if(!type)throw new NotFoundException("type not found")
      return type
  } 

  async remove(id:number){
    await this.findOneById(id)
    await this.MenuTypeRepository.delete({id})
    return{
      message:"type deleted successfully"
    }
  }

  async update (menuTypeDto:menuTypeDto){
    const{id}=this.request.supplier
    const{title}=menuTypeDto
    let type=await this.findOneById(id)
    if(!type)throw new NotFoundException("type not found")
       type.title=title
      await this.MenuTypeRepository.save(type)
      return {
        message:"update Successfully"
      }
  }


}
