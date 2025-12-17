"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("./user.model");
const RolesUser_model_1 = require("../role/RolesUser.model");
const role_model_1 = require("../role/role.model");
const role_service_1 = require("../role/role.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const files_service_1 = require("../files/files.service");
let UserService = class UserService {
    constructor(userRepository, userRoleRepository, roleRepository, roleService, jwt, fileService) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.roleService = roleService;
        this.jwt = jwt;
        this.fileService = fileService;
    }
    async generateToken(user) {
        const { id, email, role } = user;
        return { token: this.jwt.sign({ id, email, role }) };
    }
    async createUser(dto) {
        const candidate = await this.userRepository.findOne({ where: { nickname: dto.nickname, email: dto.email } });
        if (!candidate) {
            try {
                const hashPass = await bcrypt.hash(dto.password, 5);
                const user = await this.userRepository.create({ ...dto, password: hashPass });
                const role = await this.roleService.getRoleByValue('USER');
                await user.$set('role', role.id);
                return this.generateToken(user);
            }
            catch (error) {
                throw new common_1.HttpException("Такой пользователь уже существует", common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else
            throw new common_1.HttpException("Такой пользователь уже существует", common_1.HttpStatus.BAD_REQUEST);
    }
    async login(userDto) {
        const user = await this.userRepository.findOne({
            where: { nickname: userDto.nickname },
            include: {
                model: role_model_1.Role
            }
        });
        if (user) {
            const pass = await bcrypt.compare(userDto.password, user.password);
            if (pass) {
                return this.generateToken(user);
            }
            throw new common_1.HttpException("Неверный логин или пароль", common_1.HttpStatus.BAD_REQUEST);
        }
        else
            throw new common_1.HttpException("Такого пользователя нет, пожалуйста, зарегистрируетесь", common_1.HttpStatus.BAD_REQUEST);
    }
    async getUser(hs) {
        try {
            const token = this.jwt.decode(hs.split(' ')[1]);
            if (token.role != undefined && (token.role[0].role == 'ADMIN' || token.role[0].role == 'SUPERUSER')) {
                const user = await this.userRepository.findOne({
                    attributes: ['firstName', 'secondName', 'fatherName', 'email', 'phone', 'country', 'region', 'city', 'street', 'home', 'flat', 'avatar', 'passportSeria', 'passportNumber'],
                    where: {
                        id: token.id
                    }
                });
                return user;
            }
            else {
                const user = await this.userRepository.findOne({
                    attributes: ['firstName', 'secondName', 'fatherName', 'email', 'phone', 'country', 'region', 'city', 'street', 'home', 'flat', 'avatar'],
                    where: {
                        id: token.id
                    }
                });
                return user;
            }
        }
        catch (error) {
            return false;
        }
    }
    async updateUser(formdata, avatar, hs) {
        const token = this.jwt.decode(hs.split(' ')[1]);
        const us = await this.userRepository.findOne({ where: { id: token.id } });
        try {
            if (token.role != undefined && token.role[0].role == 'ADMIN') {
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
                }, {
                    where: {
                        id: token.id
                    }
                });
            }
            else {
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
                }, {
                    where: {
                        id: token.id
                    }
                });
            }
            if (us.avatar == null && formdata['avatarTitle'].length > 0) {
                const mean_img = await this.fileService.createFile(avatar);
                const r = await this.userRepository.update({
                    avatar: mean_img
                }, {
                    where: {
                        id: us.id
                    }
                });
            }
            else {
                if (us.avatar && formdata['avatarTitle'].length > 0 && us.avatar != formdata['avatarTitle']) {
                    const mean_img = await this.fileService.createFile(avatar);
                    const r = await this.userRepository.update({
                        avatar: mean_img
                    }, {
                        where: {
                            id: us.id
                        }
                    });
                }
                else {
                    if (us.avatar != null && formdata['avatarTitle'].length == 0) {
                        const r = await this.userRepository.update({
                            avatar: null
                        }, {
                            where: {
                                id: us.id
                            }
                        });
                    }
                }
            }
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async getAdmins() {
        try {
            const users = this.userRepository.findAll({
                include: [{ model: role_model_1.Role, where: { role: 'ADMIN' } }]
            });
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async getCandidate(email) {
        try {
            const res = this.userRepository.findOne({ where: { email } });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(1, (0, sequelize_1.InjectModel)(RolesUser_model_1.RolesUser)),
    __param(2, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object, Object, Object, role_service_1.RoleService,
        jwt_1.JwtService,
        files_service_1.FilesService])
], UserService);
//# sourceMappingURL=user.service.js.map