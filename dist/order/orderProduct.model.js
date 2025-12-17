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
exports.OrderProduct = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const order_model_1 = require("./order.model");
const product_model_1 = require("../products/product.model");
const variations_model_1 = require("../products/variations.model");
const swagger_1 = require("@nestjs/swagger");
let OrderProduct = class OrderProduct extends sequelize_typescript_1.Model {
};
exports.OrderProduct = OrderProduct;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id таблицы' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id вариации' }),
    (0, sequelize_typescript_1.ForeignKey)(() => variations_model_1.Variations),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "varId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10', description: 'Количество товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id заказа' }),
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "orderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id товара' }),
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], OrderProduct.prototype, "productId", void 0);
exports.OrderProduct = OrderProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "OrderProducts" })
], OrderProduct);
//# sourceMappingURL=orderProduct.model.js.map