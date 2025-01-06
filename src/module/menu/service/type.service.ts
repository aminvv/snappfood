import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateMenuDto } from '../dto/create-menu.dto';
import { UpdateMenuDto } from '../dto/update-menu.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuEntity } from '../entities/menu.entity';
import { Repository } from 'typeorm';
import { TypeEntity } from '../entities/type.entity';

@Injectable({ scope: Scope.REQUEST })
export class TypeService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectRepository(TypeEntity) private typeRepository: Repository<TypeEntity>
  ) { }

  async create(title: string) {
    const { id } = this.request.supplier
    const supplier = await this.typeRepository.findOneBy({ supplierId: id })
    if (supplier) throw new NotFoundException("supplier not found")
    const type = this.typeRepository.create({
      title: title
    })
    await this.typeRepository.save(type)
    return{
      message:"create Successfully"
    }
  }

  async findAll(){
    return await this.typeRepository.findAndCount({
      where:{},
      order:{id:"DESC"}
    })
  }

  async findOneById(id:number){
    const type=await this.typeRepository.findOneBy({id})
    if(type)throw new NotFoundException("type not found")
      return type
  } 

  async remove(id:number){
    await this.findOneById(id)
    await this.typeRepository.delete({id})
    return{
      message:"type deleted successfully"
    }
  }


}
