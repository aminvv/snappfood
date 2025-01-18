import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { UserBasketEntity } from "src/module/basket/entities/user-basket.entity";
import { BasketDiscountType } from "src/module/basket/enum/discount-type.enum";
import { Column, Entity, OneToMany } from "typeorm";

@Entity(EntityName.Discount)
export class DiscountEntity extends BaseEntityCustom{
    @Column()
    code:number
    @Column({type:"double",nullable:true})
    percent:number
    @Column({type:"double",nullable:true})
    amount:number
    @Column({nullable:true})
    expiresIn:Date
    @Column({nullable:true})
    limit:number
    @Column({nullable:true,default:0})
    usage:number
    @Column({nullable:true})
    supplierId:number
    @Column({default:true})
    active:boolean
    @Column({type:"enum",enum:BasketDiscountType,nullable:true})
    type:string
    @OneToMany(()=>UserBasketEntity,basket=>basket.discount)
    basket:UserBasketEntity[]
  foodId: number | (() => string);
}
