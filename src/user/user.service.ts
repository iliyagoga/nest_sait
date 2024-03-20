import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RolesUser } from 'src/role/RolesUser.model';
import { Role } from 'src/role/role.model';
import { CreateUserDto } from './dto/user.dto';
import { RoleService } from 'src/role/role.service';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(RolesUser) private userRoleRepository: typeof RolesUser,
        @InjectModel (Role) private roleRepository: typeof Role,
        private roleService: RoleService,
        private jwt: JwtService)
        {}
        
    async generateToken(user:User){
        const {id,email,role}=user
        return {token: this.jwt.sign({id,email,role})}

    }

    async createUser(dto: CreateUserDto){
        const candidate = await this.userRepository.findOne({where: {nickname: dto.nickname, email: dto.email}});
        if(!candidate){
            try {
                const hashPass=await bcrypt.hash(dto.password,5)
                const user= await this.userRepository.create({...dto,password:hashPass})
                const role = await this.roleService.getRoleByValue('USER')
                await user.$set('role',role.id)
                return this.generateToken(user)
            } catch (error) {
                throw new HttpException("Такой пользователь уже существует", HttpStatus.BAD_REQUEST)
            }
          
        }
        else
        throw new HttpException("Такой пользователь уже существует", HttpStatus.BAD_REQUEST)
       
    }

    async login(userDto: LoginDto){
        const user= await this.userRepository.findOne({
            where:{nickname:userDto.nickname},
            include:{
                model: Role
            }
        });

        if(user){
            const pass= await bcrypt.compare(userDto.password,user.password)
            if(pass){
                return this.generateToken(user);
            }
            throw new HttpException("Неверный логин или пароль",HttpStatus.BAD_REQUEST)
        }
        else
        throw new HttpException("Такого пользователя нет, пожалуйста, зарегистрируетесь", HttpStatus.BAD_REQUEST)
    }

    async getUser(){
        
    }
}
