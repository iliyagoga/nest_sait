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
exports.AnalitycsController = void 0;
const common_1 = require("@nestjs/common");
const analitycs_service_1 = require("./analitycs.service");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const roles_guard_1 = require("../role/roles.guard");
const roles_auth_decoration_1 = require("../role/roles-auth.decoration");
const swagger_1 = require("@nestjs/swagger");
const type_1 = require("./types/type");
const product_model_1 = require("../products/product.model");
const category_model_1 = require("../filters/category.model");
const coupon_model_1 = require("../coupon/coupon.model");
let AnalitycsController = class AnalitycsController {
    constructor(analitycsService) {
        this.analitycsService = analitycsService;
    }
    getOrderWeek() {
        return this.analitycsService.getOrder('w');
    }
    getOrderMounth() {
        return this.analitycsService.getOrder('m');
    }
    getOrderYear() {
        return this.analitycsService.getOrder('y');
    }
    getCountUsers() {
        return this.analitycsService.getCountUsers();
    }
    getTopProduct(limit) {
        return this.analitycsService.getTopProduct(limit);
    }
    getTopCategory(limit) {
        return this.analitycsService.getTopCategory(limit);
    }
    getTopCoupon(limit) {
        return this.analitycsService.getTopCoupons(limit);
    }
};
exports.AnalitycsController = AnalitycsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение статистики за неделю' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: type_1.Types }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getOrdersByWeek'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getOrderWeek", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение статистики за месяц' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: type_1.Types }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getOrdersByMounth'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getOrderMounth", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение статистики за год' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: type_1.Types }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getOrdersByYear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getOrderYear", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества зарегистрированных пользователей' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCountUsers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getCountUsers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка товаров по количеству заказов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getTopProduct/:limit'),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getTopProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка категорий по количеству заказов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: category_model_1.Category }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getTopCategory/:limit'),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getTopCategory", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка купонов по количеству заказов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getTopCoupons/:limit'),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnalitycsController.prototype, "getTopCoupon", null);
exports.AnalitycsController = AnalitycsController = __decorate([
    (0, swagger_1.ApiTags)('Аналитика'),
    (0, common_1.Controller)('analitycs'),
    __metadata("design:paramtypes", [analitycs_service_1.AnalitycsService])
], AnalitycsController);
//# sourceMappingURL=analitycs.controller.js.map