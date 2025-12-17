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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("./coupon.service");
const createCoupon_dto_1 = require("./dto/createCoupon.dto");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const roles_guard_1 = require("../role/roles.guard");
const roles_auth_decoration_1 = require("../role/roles-auth.decoration");
const redactCoupon_dto_1 = require("./dto/redactCoupon.dto");
const swagger_1 = require("@nestjs/swagger");
const coupon_model_1 = require("./coupon.model");
let CouponController = class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    createCoupon(dto) {
        return this.couponService.createCoupon(dto);
    }
    deleteCoupon(ids) {
        return this.couponService.removeCoupon(ids);
    }
    redactCoupon(dto) {
        return this.couponService.redactCoupon(dto);
    }
    getCoupons() {
        return this.couponService.getCoupons();
    }
    getCouponsPages(limit) {
        return this.couponService.getCouponsPages(limit);
    }
    getCouponsLimit(page, limit, order) {
        return this.couponService.getCouponsLimit(page, limit, order);
    }
};
exports.CouponController = CouponController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание купона' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/createCoupon'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCoupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "createCoupon", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление купона' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/deleteCoupon'),
    __param(0, (0, common_1.Body)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "deleteCoupon", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Редактирование купона' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/redactCoupon'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [redactCoupon_dto_1.RedactCouponDto]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "redactCoupon", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка купонов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCoupons'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getCoupons", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение страниц (из расчета количества записей в 1 странице)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCouponsPages/:limit'),
    __param(0, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getCouponsPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение купонов (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: coupon_model_1.Coupon }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCoupons/:page/:limit/:order'),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('limit')),
    __param(2, (0, common_1.Param)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], CouponController.prototype, "getCouponsLimit", null);
exports.CouponController = CouponController = __decorate([
    (0, swagger_1.ApiTags)('Купоны'),
    (0, common_1.Controller)('coupon'),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponController);
//# sourceMappingURL=coupon.controller.js.map