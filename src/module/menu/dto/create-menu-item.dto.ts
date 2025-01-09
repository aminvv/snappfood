import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuItemDto {
    @ApiProperty()
    name:string 
    @ApiProperty({format:"binary"})
    image:string 
    @ApiProperty({type:"number"})
    price:number
    @ApiProperty({type:"number",default:0})
    discount:number
    @ApiProperty()
    description:string
    @ApiProperty({type:"number"})
    typeId:number
}
 