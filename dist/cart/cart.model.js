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
exports.Cart = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("../products/product.model");
const variations_model_1 = require("../products/variations.model");
const user_model_1 = require("../user/user.model");
let Cart = class Cart extends sequelize_typescript_1.Model {
};
exports.Cart = Cart;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Первичный ключ' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Внешний ключ к таблице Users' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Внешний ключ к таблице Products' }),
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Cart.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, description: 'Внешний ключ к таблице Variations' }),
    (0, sequelize_typescript_1.ForeignKey)(() => variations_model_1.Variations),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Cart.prototype, "varId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Количество данного продукта' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Cart.prototype, "count", void 0);
exports.Cart = Cart = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Carts" })
], Cart);
//# sourceMappingURL=cart.model.js.map