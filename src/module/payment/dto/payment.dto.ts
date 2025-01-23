import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class paymentDataDto {
    amount:number
    invoice_number:string
    orderId:number
    status:boolean
    userId:number

}
export class PaymentDto {
    @ApiProperty()
    addressId:number
    @ApiPropertyOptional()
    description?:string
    

}


