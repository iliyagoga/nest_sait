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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
const validation_pipe_1 = require("../pipes/validation.pipe");
const login_dto_1 = require("./dto/login.dto");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const roles_auth_decoration_1 = require("../role/roles-auth.decoration");
const roles_guard_1 = require("../role/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("./user.model");
let UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(userDto) {
        return this.usersService.createUser(userDto);
    }
    login(loginDto) {
        return this.usersService.login(loginDto);
    }
    checkToken(hs) {
        return this.usersService.getUser(hs);
    }
    updateUser(avatar, formdata, hs) {
        return this.usersService.updateUser(formdata, avatar, hs);
    }
    getAdmins() {
        return this.usersService.getAdmins();
    }
    getAdmin(email) {
        return this.usersService.getCandidate(email);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Регистрация' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/reg'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Авторизация' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Проверка токена' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/checkToken'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление информации профиля' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/updateUser'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Blob, FormData, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка администраторов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_auth_decoration_1.Roles)('SUPERUSER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/getAdmins'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAdmins", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Поиск пользователя по почте' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_model_1.User }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_auth_decoration_1.Roles)('SUPERUSER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/getAdmin'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAdmin", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Пользователи'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map