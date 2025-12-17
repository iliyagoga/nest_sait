"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const order_model_1 = require("./order.model");
const addresOrder_model_1 = require("./addresOrder.model");
const orderProduct_model_1 = require("./orderProduct.model");
const coupon_model_1 = require("../coupon/coupon.model");
const order_controller_1 = require("./order.controller");
const order_service_1 = require("./order.service");
const variations_model_1 = require("../products/variations.model");
const jwt_1 = require("@nestjs/jwt");
const cart_model_1 = require("../cart/cart.model");
const cart_service_1 = require("../cart/cart.service");
const product_model_1 = require("../products/product.model");
const attributes_model_1 = require("../products/attributes.model");
const orderUser_model_1 = require("./orderUser.model");
const user_model_1 = require("../user/user.model");
const coupon_service_1 = require("../coupon/coupon.service");
const AttributeValuea_model_1 = require("../products/AttributeValuea.model");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([order_model_1.Order, addresOrder_model_1.AddresOrder, orderProduct_model_1.OrderProduct, orderUser_model_1.OrderUser, coupon_model_1.Coupon, variations_model_1.Variations, cart_model_1.Cart, product_model_1.Product, attributes_model_1.Attribute, user_model_1.User, AttributeValuea_model_1.AttributeValue])
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService, jwt_1.JwtService, cart_service_1.CartService, coupon_service_1.CouponService]
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map