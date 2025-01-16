import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MenuTypeEntity, } from "./menu-type.entity";
import { SupplierEntity } from "src/module/supplier/entities/supplier.entity";
import { FeedbackEntity } from "./feedback.entity";
import { UserBasketEntity } from "src/module/basket/entities/user-basket.entity";

@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntityCustom {

    @Column()
    name: string
    @Column({ nullable: true })
    image: string
    @Column()
    key: string
    @Column({type:"double", default:0})
    discount:number
    @Column({default:false})
    is_active:boolean
    @Column({ nullable: true, unique: true })
    slug: string
    @Column({ type: "double", nullable: true })
    price: number
    @Column()
    description: string
    @Column({ type: "double", nullable: true })
    score: number
    @Column()
    typeId: number
    @Column()
    supplierId: number
    @ManyToOne(() => MenuTypeEntity, type => type.food)
    type: MenuTypeEntity
    @ManyToOne(() => SupplierEntity, type => type.menu)
    supplier: SupplierEntity
    @OneToMany(() => FeedbackEntity, feedback => feedback.food)
    feedback: FeedbackEntity[]
    @OneToMany(() => UserBasketEntity, baskets => baskets.food)
    baskets: UserBasketEntity[]

}
