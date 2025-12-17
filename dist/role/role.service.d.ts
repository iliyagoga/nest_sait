import { Role } from './role.model';
import { CreateRoleDto } from './dto/createRole.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { RolesUser } from './RolesUser.model';
export declare class RoleService {
    private roles;
    private userRepository;
    private roleUserRepository;
    private jwt;
    constructor(roles: typeof Role, userRepository: typeof User, roleUserRepository: typeof RolesUser, jwt: JwtService);
    createRole(dto: CreateRoleDto): Promise<Role>;
    getRoleByValue(value: string): Promise<Role>;
    checkRole(headers: object): Promise<boolean>;
    createAdmin(email: string, role?: string): Promise<boolean>;
    deleteAdmin(email: string, role?: string): Promise<boolean>;
}
