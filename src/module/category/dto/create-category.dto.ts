import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ShowType } from "../enums/show-type.enum";

export class CreateCategoryDto{
    @ApiProperty()
    title:string
    @ApiProperty()
    slug:string
    @ApiPropertyOptional({ nullable: true ,format:"binary" })
    image: string
    @ApiPropertyOptional({ nullable: true, enum:ShowType })
    show: boolean
    @ApiProperty()
    parentId:number
}