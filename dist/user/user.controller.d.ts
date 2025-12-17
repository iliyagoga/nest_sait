import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { User } from './user.model';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    create(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    checkToken(hs: string): Promise<false | User>;
    updateUser(avatar: Blob, formdata: FormData, hs: string): Promise<boolean>;
    getAdmins(): Promise<User[]>;
    getAdmin(email: string): Promise<User>;
}
