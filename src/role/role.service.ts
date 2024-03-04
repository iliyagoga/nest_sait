import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';
import { CreateRoleDto } from './dto/createRole.dto';
import { ValidationException } from 'src/exceptions/validation.exception';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role) private roles: typeof Role,
        @InjectModel(User) private userRepository: typeof User,
        private jwt: JwtService
        ){}

    async createRole(dto: CreateRoleDto){
        try {
            return await this.roles.create(dto);
        } catch (error) {
            throw new ValidationException(error.name)
        }
        
    }
    async getRoleByValue(value: string){
        return await this.roles.findOne({where: {role:value}})

    }

    async checkRole(headers: object){
        const token: string[]= headers["authorization"].split(' ')
        if(token[0]=='Bearer'){
            const decod= this.jwt.decode(token[1])
            try {
                const res= await this.userRepository.findOne({
                    where: {id: decod.id},
                    include: {
                        model: Role,
                        where: {
                            role: 'ADMIN'
                        }
                    }
                })
                if(res){
                    return true;
                }
                else{
                    return false;
                }
            } catch (error) {
                throw new HttpException("", HttpStatus.BAD_REQUEST)
            }
        }

    }
}
