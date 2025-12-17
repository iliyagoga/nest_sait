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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupon = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const order_model_1 = require("../order/order.model");
let Coupon = class Coupon extends sequelize_typescript_1.Model {
};
exports.Coupon = Coupon;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id купона' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Coupon.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'весна2024', description: 'Название купона' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "couponTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000', description: 'Скидка купона' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Coupon.prototype, "couponValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-13 00:46:13.636+04', description: 'Время жизни купона' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BIGINT, allowNull: false }),
    __metadata("design:type", Number)
], Coupon.prototype, "couponTimelife", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_model_1.Order),
    __metadata("design:type", Array)
], Coupon.prototype, "Order", void 0);
exports.Coupon = Coupon = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Coupons" })
], Coupon);
//# sourceMappingURL=coupon.model.js.map