"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalitycsModule = void 0;
const common_1 = require("@nestjs/common");
const analitycs_controller_1 = require("./analitycs.controller");
const analitycs_service_1 = require("./analitycs.service");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const order_model_1 = require("../order/order.model");
const user_model_1 = require("../user/user.model");
const orderProduct_model_1 = require("../order/orderProduct.model");
const product_model_1 = require("../products/product.model");
const coupon_model_1 = require("../coupon/coupon.model");
let AnalitycsModule = class AnalitycsModule {
};
exports.AnalitycsModule = AnalitycsModule;
exports.AnalitycsModule = AnalitycsModule = __decorate([
    (0, common_1.Module)({
        controllers: [analitycs_controller_1.AnalitycsController],
        providers: [analitycs_service_1.AnalitycsService, jwt_1.JwtService],
        imports: [sequelize_1.SequelizeModule.forFeature([order_model_1.Order, user_model_1.User, orderProduct_model_1.OrderProduct, product_model_1.Product, coupon_model_1.Coupon])]
    })
], AnalitycsModule);
//# sourceMappingURL=analitycs.module.js.map