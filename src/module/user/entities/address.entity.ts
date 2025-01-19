import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";
import { UserEntity } from "./user.entity";
import { PaymentEntity } from "src/module/payment/entities/payment.entity";
import { OrderEntity } from "src/module/order/entities/order.entity";

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
        @OneToMany(()=>OrderEntity,ordersPay=>ordersPay.userAddress,{onDelete:"CASCADE"})
        ordersPay:OrderEntity[]
     }  