import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req= context.switchToHttp().getRequest()
        try {
           
            const authHeader = req.headers.authorization;
            const b=authHeader.split(' ')[0]
            const token=authHeader.split(' ')[1]
            if(b !=='Bearer' || !token){
                throw new HttpException("Пользователь не авторизован",HttpStatus.BAD_REQUEST)
            }
            const user= this.jwtService.verify(token, {secret: "SECRET"})
            req.user=user
            return true


        } catch (error) {
            throw new HttpException("Пользователь не авторизован",HttpStatus.BAD_REQUEST)
        }
    }

}