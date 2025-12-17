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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const cart_service_1 = require("./cart.service");
const addToCart_dto_1 = require("./dto/addToCart.dto");
const removeFromCart_dto_1 = require("./dto/removeFromCart.dto");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const validation_pipe_1 = require("../pipes/validation.pipe");
const GetCart_1 = require("./types/GetCart");
const swagger_1 = require("@nestjs/swagger");
const cart_model_1 = require("./cart.model");
const CouponValue_1 = require("./types/CouponValue");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(hs) {
        return this.cartService.getCart(hs);
    }
    addToCart(hs, dto) {
        return this.cartService.addToCart(dto, hs);
    }
    removeFromCart(dto) {
        return this.cartService.removeFromCart(dto);
    }
    plusCount(hs, productId, varId) {
        return this.cartService.plusCount(productId, varId, hs);
    }
    minusCount(hs, productId, varId) {
        return this.cartService.minusCount(productId, varId, hs);
    }
    changeVars(hs, productId, varId, newVarId) {
        return this.cartService.changeVars(productId, varId, newVarId, hs);
    }
    countAll(hs) {
        return this.cartService.countAll(hs);
    }
    getCoupon(coupon, auth) {
        return this.cartService.getCoupon(coupon, auth);
    }
};
exports.CartController = CartController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение товаров в корзине' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: GetCart_1.GetCart }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/getCart'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Добавление товара в корзину' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_model_1.Cart }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validation_pipe_1.ValidationPipe),
    (0, common_1.Post)('/addToCart'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, addToCart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addToCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление товара из корзины' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_model_1.Cart }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/removeFromCart'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [removeFromCart_dto_1.RemoveFromCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeFromCart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Прибавление единицы количества определенного товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_model_1.Cart }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/plusCount'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)('productId')),
    __param(2, (0, common_1.Body)('varId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "plusCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Убавление единицы количества определенного товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_model_1.Cart }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/minusCount'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)('productId')),
    __param(2, (0, common_1.Body)('varId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "minusCount", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Проверка вариации на существование' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_model_1.Cart }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/changeVars'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)('productId')),
    __param(2, (0, common_1.Body)('varId')),
    __param(3, (0, common_1.Body)('newVarId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "changeVars", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Подсчет общего количества различных товаров в корзине' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/countAll'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "countAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение скидки купона' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: CouponValue_1.CouponValue }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/getCoupon/:coupon'),
    __param(0, (0, common_1.Param)('coupon')),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCoupon", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Корзина'),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map