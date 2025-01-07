import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { CategoryEntity } from "src/module/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { SupplierOtpEntity } from "./suplier-otp.entity";
import { SupplierStatus } from "../enums/status.enum";
import { MenuTypeEntity,  } from "src/module/menu/entities/menu-type.entity";
import { MenuEntity } from "src/module/menu/entities/menu.entity";

@Entity(EntityName.Supplier)
export class SupplierEntity extends BaseEntityCustom {
    @Column()
    manager_name: string
    @Column()
    manager_family: string
    @Column()
    store_name: string
    @Column({ nullable: true })
    categoryId: number
    @Column()
    city: string
    @Column({ nullable: true })
    acceptedDoc: string
    @Column({ nullable: true })
    image: string
    @Column({ nullable: true })
    email: string
    @Column({ nullable: true, default: SupplierStatus.Register })
    status: string
    @Column({ nullable: true })
    national_code: string
    @Column()
    phone: string
    @Column({ default: false })
    supplier_Phone_verify: boolean
    @Column({ nullable: true })
    supplier_otpId: number
    @Column()
    invite_code: string
    @Column({ nullable: true })
    agentId: number
    @ManyToOne(() => CategoryEntity, category => category.supplier, { onDelete: "SET NULL" })
    category: CategoryEntity
    @ManyToOne(() => SupplierEntity, supplier => supplier.subsets)
    agent: SupplierEntity
    @OneToMany(() => CategoryEntity, category => category.agent)
    subsets: SupplierEntity[]
    @OneToMany(() => MenuTypeEntity, type => type.supplier)
    menuType: MenuTypeEntity[]
    @OneToMany(() => MenuEntity, menu => menu.supplier)
    menu: MenuTypeEntity[]
    @OneToOne(() => SupplierOtpEntity, SupplierOtp => SupplierOtp.supplier)
    @JoinColumn({ name: "supplier_otpId" })
    supplierOtp: SupplierOtpEntity

}
