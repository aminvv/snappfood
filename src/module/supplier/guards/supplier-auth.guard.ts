import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { SKIP_AUTH } from "src/common/decorator/skip-Auth.decorator";
import { TokenService } from "src/module/auth/token.service";
import { isJWT } from "validator";

@Injectable()
export class SupplierGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private reflector:Reflector
  ) {}
  async canActivate(context: ExecutionContext) {
    const isSkippedAuth=this.reflector.get<boolean>(SKIP_AUTH,context.getHandler())
    if(isSkippedAuth)return true
    const httpContext = context.switchToHttp();
    const request: Request = httpContext.getRequest<Request>();
    const token = this.extractToken(request);
    request.supplier = await this.tokenService.validationSupplierAccessToken(token);
    return true;
  }
  protected extractToken(request: Request) {
      const {authorization} = request.headers;
    if (!authorization || authorization?.trim() == "") {
      throw new UnauthorizedException("Login on your account");
    }
    const [bearer, token] = authorization?.split(" ");
    if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token))
      throw new UnauthorizedException("Login on your account");
    return token;
  }
}