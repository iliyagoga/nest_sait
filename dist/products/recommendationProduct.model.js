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
exports.RecommendationProducts = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("./product.model");
const swagger_1 = require("@nestjs/swagger");
let RecommendationProducts = class RecommendationProducts extends sequelize_typescript_1.Model {
};
exports.RecommendationProducts = RecommendationProducts;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id таблицы' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], RecommendationProducts.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id товара' }),
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], RecommendationProducts.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id рекомедованного товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], RecommendationProducts.prototype, "productRecId", void 0);
exports.RecommendationProducts = RecommendationProducts = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "RecommendationProducts" })
], RecommendationProducts);
//# sourceMappingURL=recommendationProduct.model.js.map