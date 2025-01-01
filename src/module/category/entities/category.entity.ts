import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne, OneToMany,  } from "typeorm";

@Entity(EntityName.Category)
export class CategoryEntity extends BaseEntityCustom{
    @Column()
    title:string
    @Column({unique:true})
    slug:string
    @Column()
    image:string
    @Column({nullable:true})
    imageKey:string
    @Column()
    show:boolean
    @Column({nullable:true})
    parentId:number
    @ManyToOne(()=>CategoryEntity,parent=>parent.children)
    parent:CategoryEntity
    @OneToMany(()=>CategoryEntity,children=>children.parent,{onDelete:"CASCADE"})
    children:CategoryEntity[]    
}