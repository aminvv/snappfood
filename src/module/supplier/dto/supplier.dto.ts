import { ApiProperty } from "@nestjs/swagger";

export class CheckSupplierOtpDto {
    @ApiProperty()
    phone: string
    @ApiProperty()
    code: string
}


export class SupplierSignupDto {
    @ApiProperty()
    manager_name: string
    @ApiProperty()
    manager_family: string
    @ApiProperty()
    categoryId: number
    @ApiProperty()
    city: string
    @ApiProperty()
    phone: string
    @ApiProperty()
    store_name: string
    @ApiProperty()
    invite_code: string

}

export class SupplementaryInformationDto{
@ApiProperty()
email:string
@ApiProperty()
national_code:string
}

