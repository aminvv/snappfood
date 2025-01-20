import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { OrderStatus } from "../enum/status.enum";
import { OrderItemsEntity } from "src/module/order/entities/order-items.entity";
import { UserAddressEntity } from "src/module/user/entities/address.entity";
import { UserEntity } from "src/module/user/entities/user.entity";
import { PaymentEntity } from "src/module/payment/entities/payment.entity";

@Entity(EntityName.Order)
export class OrderEntity extends BaseEntityCustom{
    @Column()
    userId:number
    @Column({nullable:true})
    addressId:number
    @Column()
    payment_amount:number
    @Column()
    discount_amount:number
    @Column()
    total_amount:number
    @Column({type:"enum",enum:OrderStatus,default:OrderStatus.Pending})
    status:string
    @Column({nullable:true})
    description:string

    @ManyToOne(() => UserEntity, user => user.payment, { onDelete: "CASCADE" })
    user: UserEntity
    @ManyToOne(() => UserAddressEntity, address => address.ordersPay, { onDelete: "SET NULL" })
    userAddress: UserAddressEntity
    @OneToMany(() => OrderItemsEntity, item => item.order )
    items: OrderItemsEntity[]
    @OneToMany(() => PaymentEntity, payment => payment.order )
    payments: PaymentEntity[]
}
 