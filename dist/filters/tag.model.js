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
exports.Tag = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const product_model_1 = require("../products/product.model");
const TagProduct_model_1 = require("./TagProduct.model");
const swagger_1 = require("@nestjs/swagger");
let Tag = class Tag extends sequelize_typescript_1.Model {
};
exports.Tag = Tag;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id тега' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ТОП1', description: 'Наименование тега' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, unique: true }),
    __metadata("design:type", String)
], Tag.prototype, "tagTitle", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => TagProduct_model_1.TagProduct),
    __metadata("design:type", Array)
], Tag.prototype, "product", void 0);
exports.Tag = Tag = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Tags" })
], Tag);
//# sourceMappingURL=tag.model.js.map