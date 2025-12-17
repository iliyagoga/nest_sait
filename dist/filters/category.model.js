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
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const group_model_1 = require("./group.model");
const product_model_1 = require("../products/product.model");
const CategoryProduct_model_1 = require("./CategoryProduct.model");
const swagger_1 = require("@nestjs/swagger");
let Category = class Category extends sequelize_typescript_1.Model {
};
exports.Category = Category;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id категории' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Футболки', description: 'Наименование категории' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'id группы категорий' }),
    (0, sequelize_typescript_1.ForeignKey)(() => group_model_1.Group),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Category.prototype, "groupId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => group_model_1.Group),
    __metadata("design:type", group_model_1.Group)
], Category.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => CategoryProduct_model_1.CategoryProduct),
    __metadata("design:type", Array)
], Category.prototype, "product", void 0);
exports.Category = Category = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Categories" })
], Category);
//# sourceMappingURL=category.model.js.map