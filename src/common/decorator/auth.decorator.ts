import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserGuard } from "src/module/auth/guards/user-auth.guard";
import { SupplierGuard } from "src/module/supplier/guards/supplier-auth.guard";

export function SupplierAuth(){
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(SupplierGuard),
    )
}
export function UserAuth(){
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(UserGuard)
    )
}