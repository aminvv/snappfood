import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { SupplierGuard } from "src/module/supplier/guards/supplier-auth.guard";

export function SupplierAuth(){
    return applyDecorators(
        ApiBearerAuth("Authorization"),
        UseGuards(SupplierGuard)
    )
}