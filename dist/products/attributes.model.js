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
exports.Attribute = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const AttributeValuea_model_1 = require("./AttributeValuea.model");
const swagger_1 = require("@nestjs/swagger");
let Attribute = class Attribute extends sequelize_typescript_1.Model {
};
exports.Attribute = Attribute;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id атрибута' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Attribute.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Состав', description: 'Название атрибута' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false, unique: true }),
    __metadata("design:type", String)
], Attribute.prototype, "attributeName", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => AttributeValuea_model_1.AttributeValue),
    __metadata("design:type", Array)
], Attribute.prototype, "attributeValue", void 0);
exports.Attribute = Attribute = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Attributes" })
], Attribute);
//# sourceMappingURL=attributes.model.js.map