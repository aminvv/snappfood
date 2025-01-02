import { ApiProperty } from "@nestjs/swagger";

export class OtpDto{
    @ApiProperty()
    mobile:string
    
}
export class CheckOtpDto {
    @ApiProperty()
    mobile: string;
    @ApiProperty()
    code: string;
  }