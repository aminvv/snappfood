import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { SupplierEntity } from "./supplier.entity";

@Entity(EntityName.supplierOtp)
export class SupplierOtpEntity extends BaseEntityCustom{
    @Column({unique:true,nullable: true})
    mobile:string
    @Column()
    code:string
    @Column()
    expires_In:Date
    @Column()
    supplierId:number
    @CreateDateColumn()
    create_at:Date
    @OneToOne(()=>SupplierEntity,supplier=>supplier.supplierOtp,{onDelete:"CASCADE"})
    supplier:SupplierEntity[]

} 