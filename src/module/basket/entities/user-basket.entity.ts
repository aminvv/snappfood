import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, Entity, ManyToOne } from "typeorm";
import { BasketDiscountType } from "../enum/discount-type.enum";
import { MenuEntity } from "src/module/menu/entities/menu.entity";
import { UserEntity } from "src/module/user/entities/user.entity";
import { DiscountEntity } from "src/module/discount/entities/discount.entity";

@Entity(EntityName.UserBasket)
export class UserBasketEntity extends BaseEntityCustom{
    @Column()
    foodId:number
    @Column()
    userId:number
    @Column()
    count:number
    @Column({nullable:true})
    discountId:number
    @Column({type:"enum",enum:BasketDiscountType,nullable:true})
    type:string
    @ManyToOne(()=>MenuEntity,food=>food.baskets,{onDelete:"CASCADE"})
    food:MenuEntity
    @ManyToOne(()=>UserEntity,user=>user.basket,{onDelete:"CASCADE"})
    user:UserEntity
    @ManyToOne(()=>DiscountEntity,discount=>discount.basket,{onDelete:"CASCADE"})
    discount:DiscountEntity

}
