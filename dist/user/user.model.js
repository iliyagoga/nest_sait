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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const cart_model_1 = require("../cart/cart.model");
const order_model_1 = require("../order/order.model");
const product_model_1 = require("../products/product.model");
const RolesUser_model_1 = require("../role/RolesUser.model");
const role_model_1 = require("../role/role.model");
let User = class User extends sequelize_typescript_1.Model {
};
exports.User = User;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id таблицы' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ttt@ttt.tt', description: 'Почта' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, unique: true, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'nick', description: 'Никнейм' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', description: 'Пароль' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '111111', description: 'Номер телефона' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Имя', description: 'Имя' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Фамилия', description: 'Фамилия' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "secondName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Отчество', description: 'Отчество' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "fatherName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1111', description: 'Серия паспорта' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], User.prototype, "passportSeria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '222222', description: 'Номер паспорта' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true }),
    __metadata("design:type", Number)
], User.prototype, "passportNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ttt.png', description: 'Аватар' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Страна', description: 'Страна' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Регион', description: 'Область, округ, штат' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Город', description: 'Город' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Улица', description: 'Улица' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8', description: 'Номер дома' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "home", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11', description: 'Номер квартиры' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], User.prototype, "flat", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => role_model_1.Role, () => RolesUser_model_1.RolesUser),
    __metadata("design:type", Array)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => cart_model_1.Cart),
    __metadata("design:type", Array)
], User.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => order_model_1.Order),
    __metadata("design:type", Array)
], User.prototype, "order", void 0);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'Users' })
], User);
//# sourceMappingURL=user.model.js.map