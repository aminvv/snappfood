import { ApiProperty } from "@nestjs/swagger";

export class CreateMenuDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    image:string
    @ApiProperty({type:"number"})
    price:number
    @ApiProperty({type:"number",default:0})
    discount:number
    @ApiProperty()
    description:string
    @ApiProperty({type:"number"})
    score:number
}
