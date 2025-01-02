import { ApiProperty } from "@nestjs/swagger";
import { BaseEntityCustom } from "src/common/abstract/baseEntityCustom.entity";
import { EntityName } from "src/common/enums/entityName.enum";
import { Column, CreateDateColumn, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity(EntityName.UserOtp)
export class OtpEntity extends BaseEntityCustom{
    @Column({unique:true,nullable: true})
    mobile:string
    @Column()
    code:string
    @Column()
    expires_In:Date
    @Column()
    userId:number
    @CreateDateColumn()
    create_at:Date
    @OneToOne(()=>UserEntity,user=>user.otp,{onDelete:"CASCADE"})
    user:UserEntity

} 