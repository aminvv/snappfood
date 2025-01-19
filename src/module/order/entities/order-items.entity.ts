import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { OrderItemStatus, } from "../enum/status.enum";
import { PaymentEntity } from "src/module/payment/entities/payment.entity";
import { OrderEntity } from "./order.entity";
import { MenuEntity } from "src/module/menu/entities/menu.entity";

@Entity(EntityName.OrderItems)
export class OrderItemsEntity extends BaseEntityCustom {
    @Column()
    foodId: number
    @Column()
    orderId: number
    @Column()
    count: number
    @Column()
    supplierId: number
    @Column({ type: "enum", enum: OrderItemStatus, default: OrderItemStatus.Pending })
    status: string

    @ManyToOne(() => OrderEntity, order => order.items, { onDelete: "CASCADE" })
    order: OrderEntity
    @ManyToOne(() => MenuEntity, menu => menu.orderItems, { onDelete: "CASCADE" })
    food: MenuEntity
}

 