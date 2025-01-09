import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { MenuTypeEntity, } from "./menu-type.entity";
import { SupplierEntity } from "src/module/supplier/entities/supplier.entity";
import { FeedbackEntity } from "./feedback.entity";

@Entity(EntityName.Menu)
export class MenuEntity extends BaseEntityCustom {

    @Column()
    name: string
    @Column({nullable:true})
    image: string
    @Column({nullable:true})
    key: string
    @Column({ type: "double" ,nullable:true})
    price: number
    @Column({ type: "double", default: 0 })
    discount: number
    @Column()
    description: string
    @Column({ type: "double", nullable:true})
    score: number
    @Column()
    typeId: number
    @Column()
    supplierId: number
    @ManyToOne(() => MenuTypeEntity, type => type.menuItem)
    type: MenuTypeEntity
    @ManyToOne(() => SupplierEntity, type => type.menu)
    supplier: SupplierEntity
    @OneToMany(() => FeedbackEntity, feedback => feedback.food)
    feedback: SupplierEntity[]

}
  