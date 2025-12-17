import { User } from './user.model';
import { RolesUser } from 'src/role/RolesUser.model';
import { Role } from 'src/role/role.model';
import { CreateUserDto } from './dto/user.dto';
import { RoleService } from 'src/role/role.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { FilesService } from 'src/files/files.service';
export declare class UserService {
    private userRepository;
    private userRoleRepository;
    private roleRepository;
    private roleService;
    private jwt;
    private fileService;
    constructor(userRepository: typeof User, userRoleRepository: typeof RolesUser, roleRepository: typeof Role, roleService: RoleService, jwt: JwtService, fileService: FilesService);
    generateToken(user: User): Promise<{
        token: string;
    }>;
    createUser(dto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(userDto: LoginDto): Promise<{
        token: string;
    }>;
    getUser(hs: string): Promise<false | User>;
    updateUser(formdata: FormData, avatar: Blob, hs: string): Promise<boolean>;
    getAdmins(): Promise<User[]>;
    getCandidate(email: string): Promise<User>;
}
