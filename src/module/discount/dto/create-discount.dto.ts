import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateDiscountDto {
    @ApiProperty()
    code:number
    @ApiPropertyOptional({type:"number",nullable:true})
    percent:number
    @ApiPropertyOptional({type:"number",nullable:true})
    amount:number
    @ApiProperty({nullable:true})
    expiresIn:number
    @ApiProperty({nullable:true})
    limit:number
    @ApiProperty({nullable:true,default:0})
    usage:number
    @ApiProperty({nullable:true})
    supplierId:number
    @ApiProperty({default:true})
    active:boolean

}
