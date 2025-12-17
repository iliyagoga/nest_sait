import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { User } from "src/user/user.model";
export declare class RolesGuard implements CanActivate {
    private jwtService;
    private reflector;
    private userRepository;
    constructor(jwtService: JwtService, reflector: Reflector, userRepository: typeof User);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
