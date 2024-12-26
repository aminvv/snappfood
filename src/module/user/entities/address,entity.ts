import { BaseEntityCustom } from "src/common/abstract/baseEntitycustom.entity";
import { EntityName } from "src/common/enums/entitName.enum";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

     @Entity(EntityName.UserAddress)
     export class UserAddressEntity extends BaseEntityCustom {
        @Column()
        title:string
        @Column()
        province:string
        @Column()
        city:string
        @Column()
        address:string
        @Column({nullable:true})
        postal_code:string
        @Column()
        userId:number
        @CreateDateColumn({type:"time with time zone"})
        create_at:Date
        @ManyToOne(()=>UserEntity,user=>user.addressList,{onDelete:"CASCADE"})
        user:UserEntity
     }