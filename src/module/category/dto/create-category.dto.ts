import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ShowType } from "../enums/show-type.enum";

export class CreateCategoryDto{
    @ApiProperty()
    title:string
    @ApiProperty()
    slug:string
    @ApiPropertyOptional({ nullable: true ,format:"binary" })
    image: String
    @ApiPropertyOptional({ nullable: true, enum:ShowType })
    gender: string
    @ApiProperty()
    parentId:number
}