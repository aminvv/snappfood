import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { SupplierEntity } from "src/module/supplier/entities/supplier.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MenuEntity } from "./menu.entity";

@Entity(EntityName.MenuType)
export class MenuTypeEntity extends  BaseEntityCustom{
@Column()
title:string
@Column()
supplierId:number
@ManyToOne(()=>SupplierEntity,supplier=>supplier.menuType,{onDelete:"CASCADE"})
supplier:SupplierEntity
@OneToMany(()=>MenuEntity,menuFood=>menuFood.type)
menuItem:MenuEntity[]
}