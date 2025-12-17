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
exports.TagProduct = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const tag_model_1 = require("./tag.model");
const product_model_1 = require("../products/product.model");
const swagger_1 = require("@nestjs/swagger");
let TagProduct = class TagProduct extends sequelize_typescript_1.Model {
};
exports.TagProduct = TagProduct;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id таблицы' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], TagProduct.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id тега' }),
    (0, sequelize_typescript_1.ForeignKey)(() => tag_model_1.Tag),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], TagProduct.prototype, "tagId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id тпродукта' }),
    (0, sequelize_typescript_1.ForeignKey)(() => product_model_1.Product),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], TagProduct.prototype, "productId", void 0);
exports.TagProduct = TagProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "TagProduct" })
], TagProduct);
//# sourceMappingURL=TagProduct.model.js.map