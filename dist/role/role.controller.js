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
exports.RoleController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const validation_pipe_1 = require("../pipes/validation.pipe");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const roles_guard_1 = require("./roles.guard");
const roles_auth_decoration_1 = require("./roles-auth.decoration");
const role_model_1 = require("./role.model");
const swagger_1 = require("@nestjs/swagger");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    getRoleByValue(id) {
        return this.roleService.getRoleByValue(id);
    }
    checkRole(headers) {
        return this.roleService.checkRole(headers);
    }
    createAdmin(email) {
        return this.roleService.createAdmin(email);
    }
    deleteAdmin(email) {
        return this.roleService.deleteAdmin(email);
    }
};
exports.RoleController = RoleController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение роли (фиктивно)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: role_model_1.Role }),
    (0, common_1.Get)("/:value"),
    __param(0, (0, common_1.Param)('value')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "getRoleByValue", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Проверка юзера на роль' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Boolean }),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/checkRole'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "checkRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание администратора' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Boolean }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_auth_decoration_1.Roles)('SUPERUSER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/createAdmin'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "createAdmin", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление администратора' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Boolean }),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_auth_decoration_1.Roles)('SUPERUSER'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/deleteAdmin'),
    __param(0, (0, common_1.Body)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "deleteAdmin", null);
exports.RoleController = RoleController = __decorate([
    (0, swagger_1.ApiTags)('Роли'),
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
//# sourceMappingURL=role.controller.js.map