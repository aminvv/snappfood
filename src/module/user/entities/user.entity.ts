import { BaseEntityCustom } from "src/common/abstract/baseEntitycustom.entity";
import { EntityName } from "src/common/enums/entitName.enum";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity(EntityName.User)
export class UserEntity extends BaseEntityCustom{
    @Column({nullable:true})
    firstName:string
    @Column({nullable:true})
    lastName:string
    @Column({unique:true})
    mobile:string
    @Column({unique:true,nullable:true})
    email:string
    @Column({unique:true})
    invite_code:string
    @Column({default:0})
    score:number
    @Column({nullable:true})
    agentId:number
    @CreateDateColumn({type:"time with time zone"})
    create_at:Date
    @UpdateDateColumn({type:"time with time zone"})
    update_at:Date

}