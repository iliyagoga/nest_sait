"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const role_module_1 = require("../role/role.module");
const sequelize_1 = require("@nestjs/sequelize");
const role_model_1 = require("../role/role.model");
const user_model_1 = require("./user.model");
const RolesUser_model_1 = require("../role/RolesUser.model");
const jwt_1 = require("@nestjs/jwt");
const files_module_1 = require("../files/files.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([role_model_1.Role, user_model_1.User, RolesUser_model_1.RolesUser]),
            jwt_1.JwtModule.register({
                secret: process.env.PRIVATE_KEY || "SECRET",
                signOptions: {
                    expiresIn: '24h'
                }
            }),
            role_module_1.RoleModule, files_module_1.FilesModule
        ],
        exports: [UserModule]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map