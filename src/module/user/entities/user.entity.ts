import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, OneToMany, UpdateDateColumn } from "typeorm";
import { UserAddressEntity } from "./address,entity";

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
    @OneToMany(()=>UserAddressEntity,address=>address.user)
    addressList:UserAddressEntity[]
}