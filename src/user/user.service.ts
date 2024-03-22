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
import { FilesService } from 'src/files/files.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(RolesUser) private userRoleRepository: typeof RolesUser,
        @InjectModel (Role) private roleRepository: typeof Role,
        private roleService: RoleService,
        private jwt: JwtService,
        private fileService: FilesService)
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

    async getUser(hs: string){
        try {
            const token = this.jwt.decode(hs.split(' ')[1])
            if(token.role!=undefined&&token.role[0].role=='ADMIN'){
                const user = await this.userRepository.findOne({
                    attributes:['firstName', 'secondName', 'fatherName','email', 'phone', 'country', 'region', 'city', 'street', 'home', 'flat','avatar','passportSeria', 'passportNumber'],
                    where: {
                        id: token.id
                    }
                })
                return user
            }
            else{
                const user = await this.userRepository.findOne({
                    attributes:['firstName', 'secondName', 'fatherName','email', 'phone', 'country', 'region', 'city', 'street', 'home', 'flat','avatar'],
                    where: {
                        id: token.id
                    }
                })
                return user
            }
       
        } catch (error) {
            return false
        }
        
      
        
    }

    async updateUser(formdata: FormData, avatar: Blob,hs: string){
        const token = this.jwt.decode(hs.split(' ')[1])
        const us= await this.userRepository.findOne({where: {id: token.id}})
        try {
            if(token.role!=undefined&&token.role[0].role=='ADMIN'){
                const user = await this.userRepository.update({
                    firstName: String(formdata['firstName']),
                    secondName: String(formdata['secondName']),
                    fatherName: String(formdata['fatherName']),
                    email: String(formdata['email']),
                    phone: Number(formdata['phone']),
                    country: String(formdata['country']),
                    region: String(formdata['region']),
                    city: String(formdata['city']),
                    street: String(formdata['street']),
                    home: String(formdata['home']),
                    flat: String(formdata['flat']),
                    passportSeria: Number(formdata['passportSeria']),
                    passportNumber: Number(formdata['passportNumber'])
    
                },{
                    where: {
                        id: token.id
                    }
                })
            }
            else{
                const user = await this.userRepository.update({
                    firstName: String(formdata['firstName']),
                    secondName: String(formdata['secondName']),
                    fatherName: String(formdata['fatherName']),
                    email: String(formdata['email']),
                    phone: Number(formdata['phone']),
                    country: String(formdata['country']),
                    region: String(formdata['region']),
                    city: String(formdata['city']),
                    street: String(formdata['street']),
                    home: String(formdata['home']),
                    flat: String(formdata['flat'])
    
                },{
                    where: {
                        id: token.id
                    }
                })
            }
            
            if(us.avatar==null && formdata['avatarTitle'].length>0){
                const mean_img= await this.fileService.createFile(avatar);
                const r = await this.userRepository.update({
                    avatar: mean_img
                },{
                    where: {
                        id: us.id
                    }
                })

            } else{
                if(us.avatar && formdata['avatarTitle'].length>0 && us.avatar!=formdata['avatarTitle']){
                    const mean_img= await this.fileService.createFile(avatar);
                    const r = await this.userRepository.update({
                        avatar: mean_img
                    },{
                        where: {
                            id: us.id
                        }
                    })
                }
                else{
                    if(us.avatar!=null && formdata['avatarTitle'].length==0){
                        const r = await this.userRepository.update({
                            avatar: null
                        },{
                            where: {
                                id: us.id
                            }
                        })
                    }

                }
            }

            return true
        } catch (error) {
            throw error;
        }
    }
}
