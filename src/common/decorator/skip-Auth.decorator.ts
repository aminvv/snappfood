import { SetMetadata } from "@nestjs/common"

export const SKIP_AUTH="SKIP_AUTH"
export const Skip_Auth=()=>SetMetadata(SKIP_AUTH,true)