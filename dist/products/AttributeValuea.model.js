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
exports.AttributeValue = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const attributes_model_1 = require("./attributes.model");
const product_model_1 = require("./product.model");
const AttributeProduct_model_1 = require("./AttributeProduct.model");
const variations_model_1 = require("./variations.model");
const swagger_1 = require("@nestjs/swagger");
let AttributeValue = class AttributeValue extends sequelize_typescript_1.Model {
};
exports.AttributeValue = AttributeValue;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id значения атрибута' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], AttributeValue.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Шерсть', description: 'Наименование значения атрибута' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false }),
    __metadata("design:type", String)
], AttributeValue.prototype, "attributeValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id атрибута' }),
    (0, sequelize_typescript_1.ForeignKey)(() => attributes_model_1.Attribute),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], AttributeValue.prototype, "attributeId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => AttributeProduct_model_1.AttributeProduct),
    __metadata("design:type", Array)
], AttributeValue.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => variations_model_1.Variations),
    __metadata("design:type", Array)
], AttributeValue.prototype, "variations", void 0);
exports.AttributeValue = AttributeValue = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "AtrributeValue" })
], AttributeValue);
//# sourceMappingURL=AttributeValuea.model.js.map