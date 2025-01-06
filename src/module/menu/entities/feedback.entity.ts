import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity,  ManyToOne } from "typeorm";
import { MenuEntity } from "./menu.entity";

@Entity(EntityName.Feedback)
export class FeedbackEntity extends BaseEntityCustom{
@Column()
userId:number
@Column()
foodId:number
@Column()
comment:string
@Column()
score:number
@CreateDateColumn()
create_at:Date
@ManyToOne(()=>UserEntity,user=>user.feedback,{onDelete:"CASCADE"})
user:UserEntity
@ManyToOne(()=>MenuEntity,menu=>menu.feedback,{onDelete:"CASCADE"})
food:MenuEntity
}