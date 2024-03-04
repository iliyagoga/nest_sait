import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decoration";
import { FiltersService } from "src/filters/filters.service";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/user.model";
import { Role } from "./role.model";
import { Op } from "sequelize";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(
        private jwtService: JwtService, 
        private reflector: Reflector,
        @InjectModel(User) private userRepository: typeof User){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req= context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY,[
                context.getHandler(),
                context.getClass()
            ])
            if(!requiredRoles){
                return true
            }
            const authHeader = req.headers.authorization;
            const b=authHeader.split(' ')[0]
            const token=authHeader.split(' ')[1]
            if(b !=='Bearer' || !token){
                throw new UnauthorizedException({message:"Пользователь не авторизован"})
            }
            const user= this.jwtService.verify(token,{secret:"SECRET"})
            // this.userRepository.findOne({
            //     where: {id: user.id},
            //     include: {
            //         model: Role,
            //         where: {
            //             role: {
            //                 [Op.or]: requiredRoles 
            //             }
            //         }
            //     }
            // }).then(res=>{
            //     console.log(res)
            //     return true
            // }).catch(err=>{console.log(2);throw err})
            req.user=user
            return user.role.some(role=>requiredRoles.includes(role.role))


        } catch (error) {
            console.log(error)
            throw new HttpException({message:"Нет доступа"}, HttpStatus.BAD_REQUEST)
        }
    }

}