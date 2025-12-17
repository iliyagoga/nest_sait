import { RoleService } from './role.service';
import { Role } from './role.model';
export declare class RoleController {
    private roleService;
    constructor(roleService: RoleService);
    getRoleByValue(id: string): Promise<Role>;
    checkRole(headers: object): Promise<boolean>;
    createAdmin(email: string): Promise<boolean>;
    deleteAdmin(email: string): Promise<boolean>;
}
