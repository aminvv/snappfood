import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { UserAddressEntity } from "./address.entity";
import { OtpEntity } from "./user-otp.entity";
import { FeedbackEntity } from "src/module/menu/entities/feedback.entity";
import { UserBasketEntity } from "src/module/basket/entities/user-basket.entity";
import { PaymentEntity } from "src/module/payment/entities/payment.entity";
import { OrderEntity } from "src/module/order/entities/order.entity";

@Entity(EntityName.User)
export class UserEntity extends BaseEntityCustom{
    @Column({nullable:true})
    firstName:string
    @Column({nullable:true})
    lastName:string
    @Column({default:false,nullable:true})
    mobile_verify:boolean
    @Column({unique:true,nullable: true})
    mobile:string
    @Column({unique:true,nullable:true})
    email:string
    @Column({unique:true,nullable:true})
    invite_code:string
    @Column({default:0})
    score:number
    @Column({nullable:true})
    otpId:number
    @Column({nullable:true})
    agentId:number
    @CreateDateColumn()
    create_at:Date
    @UpdateDateColumn()
    update_at:Date
    @OneToMany(()=>UserAddressEntity,address=>address.user)
    addressList:UserAddressEntity[]
    @OneToMany(()=>FeedbackEntity,feedback=>feedback.user)
    feedback:FeedbackEntity[]
    @OneToMany(()=>UserBasketEntity,basket=>basket.user)
    basket:UserBasketEntity[]
    @OneToMany(()=>OrderEntity,payment=>payment.user)
    payment:OrderEntity[]
    @OneToMany(()=>PaymentEntity,payment=>payment.user)
    payments:PaymentEntity[]
    @OneToOne(() => OtpEntity, otp => otp.user)
    @JoinColumn({ name: "otpId" })
    otp: OtpEntity 
}   