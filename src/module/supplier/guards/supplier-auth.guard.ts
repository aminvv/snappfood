import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { TokenService } from "src/module/auth/token.service";
import { isJWT } from "validator";

@Injectable()
export class SupplierGuard implements CanActivate{
    constructor(private tokenService:TokenService){}
async canActivate(context: ExecutionContext) {
    const httpContext=context.switchToHttp()
    const request:Request=httpContext.getRequest<Request>()
    const token=this.extractToken(request)
    request.supplier=await this.tokenService.validationSupplierAccessToken(token)
     return true 
}

protected extractToken(request:Request){
    const {authorization}=request.headers
    if(!authorization || authorization.trim()== ""){
        throw new UnauthorizedException("login on your account")
    }
        const[bearer,token]=authorization?.split(" ")
        if(bearer?.toLowerCase()!== "bearer" || !token  ||isJWT(token)){
        throw new UnauthorizedException("login on your account")

        }
        return token
} 
}