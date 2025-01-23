import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { OrderItemsEntity } from "src/module/order/entities/order-items.entity";
import { OrderEntity } from "src/module/order/entities/order.entity";
import { UserAddressEntity } from "src/module/user/entities/address.entity";
import { UserEntity } from "src/module/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity(EntityName.Payment)
export class PaymentEntity extends BaseEntityCustom {
    @Column({ default: false })
    status: boolean
    @Column()
    amount: number
    @Column()
    invoice_number: string
    @Column({nullable:true})
    authority: string
    @Column()
    userId: number
    @Column()
    orderId: number
    @CreateDateColumn()
    create_at: Date

    @ManyToOne(() => OrderEntity, order => order.payments, { onDelete: "CASCADE" })
    order: OrderEntity
    @ManyToOne(() => UserEntity, user => user.payments, { onDelete: "CASCADE" })
    user: UserEntity

}
