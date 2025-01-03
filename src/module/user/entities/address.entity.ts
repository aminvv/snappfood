import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";

     @Entity(EntityName.Address)
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
        @CreateDateColumn()
        create_at:Date
        @ManyToOne(()=>UserEntity,user=>user.addressList,{onDelete:"CASCADE"})
        user:UserEntity
     }  