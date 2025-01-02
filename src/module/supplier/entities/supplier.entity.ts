import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { CategoryEntity } from "src/module/category/entities/category.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity(EntityName.Supplier)
export class SupplierEntity extends BaseEntityCustom {
    @Column()
    manager_name:string
    @Column()
    manager_family:string
    @Column()
    store_name:string
    @Column({nullable:true})
    categoryId:number
    @Column()
    city:string
    @Column()
    phone:string
    @Column()
    invite_code:string
    @Column({nullable:true})
    agentId:number
    @ManyToOne(()=>CategoryEntity,category=>category.supplier,{onDelete:"SET NULL"})
    category:CategoryEntity
    @ManyToOne(()=>SupplierEntity,supplier=>supplier.subsets,{onDelete:"SET NULL"})
    agent:SupplierEntity
    @ManyToOne(()=>CategoryEntity,category=>category.supplier,{onDelete:"SET NULL"})
    subsets:SupplierEntity[]
    
}
