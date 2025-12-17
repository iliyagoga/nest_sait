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
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const role_model_1 = require("./role.model");
const validation_exception_1 = require("../exceptions/validation.exception");
const jwt_1 = require("@nestjs/jwt");
const user_model_1 = require("../user/user.model");
const RolesUser_model_1 = require("./RolesUser.model");
const sequelize_2 = require("sequelize");
let RoleService = class RoleService {
    constructor(roles, userRepository, roleUserRepository, jwt) {
        this.roles = roles;
        this.userRepository = userRepository;
        this.roleUserRepository = roleUserRepository;
        this.jwt = jwt;
    }
    async createRole(dto) {
        try {
            return await this.roles.create(dto);
        }
        catch (error) {
            throw new validation_exception_1.ValidationException(error.name);
        }
    }
    async getRoleByValue(value) {
        return await this.roles.findOne({ where: { role: value } });
    }
    async checkRole(headers) {
        const token = headers["authorization"].split(' ');
        if (token[0] == 'Bearer') {
            const decod = this.jwt.decode(token[1]);
            try {
                const res = await this.userRepository.findOne({
                    where: { id: decod.id },
                    include: {
                        model: role_model_1.Role,
                        where: {
                            role: { [sequelize_2.Op.or]: ['ADMIN', 'SUPERUSER'] }
                        }
                    }
                });
                if (res) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error) {
                throw new common_1.HttpException("", common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async createAdmin(email, role = 'ADMIN') {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            const roles = await this.roles.findOne({ where: { role } });
            await this.roleUserRepository.update({ roleId: roles.id }, { where: { userId: user.id } });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteAdmin(email, role = 'USER') {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            const roles = await this.roles.findOne({ where: { role } });
            await this.roleUserRepository.update({ roleId: roles.id }, { where: { userId: user.id } });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(role_model_1.Role)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(RolesUser_model_1.RolesUser)),
    __metadata("design:paramtypes", [Object, Object, Object, jwt_1.JwtService])
], RoleService);
//# sourceMappingURL=role.service.js.map