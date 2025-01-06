import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TypeEntity } from "./type.entity";
import { SupplierEntity } from "src/module/supplier/entities/supplier.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntityCustom {
    @Column()
    name:string
    @Column()
    image:string
    @Column({type:"double"})
    price:number
    @Column({type:"double",default:0})
    discount:number
    @Column()
    description:string
    @Column({type:"double"})
    score:number
    @Column()
    typeId:number
    @Column()
    supplierId:number
    @ManyToOne(()=>TypeEntity,type=>type.menuItem)
    type:TypeEntity
    @ManyToOne(()=>SupplierEntity,type=>type.menu)
    supplier:SupplierEntity
    @OneToMany(()=>FeedbackEntity,feedback=>feedback.food)
    feedback:SupplierEntity[]
    
}
