"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModule = void 0;
const common_1 = require("@nestjs/common");
const coupon_service_1 = require("./coupon.service");
const coupon_controller_1 = require("./coupon.controller");
const sequelize_1 = require("@nestjs/sequelize");
const coupon_model_1 = require("./coupon.model");
const jwt_1 = require("@nestjs/jwt");
const order_model_1 = require("../order/order.model");
const user_model_1 = require("../user/user.model");
let CouponModule = class CouponModule {
};
exports.CouponModule = CouponModule;
exports.CouponModule = CouponModule = __decorate([
    (0, common_1.Module)({
        providers: [coupon_service_1.CouponService, jwt_1.JwtService],
        controllers: [coupon_controller_1.CouponController],
        imports: [
            sequelize_1.SequelizeModule.forFeature([coupon_model_1.Coupon, order_model_1.Order, user_model_1.User]),
        ],
    })
], CouponModule);
//# sourceMappingURL=coupon.module.js.map