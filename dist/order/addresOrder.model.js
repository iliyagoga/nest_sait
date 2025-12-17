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
exports.AddresOrder = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const order_model_1 = require("./order.model");
let AddresOrder = class AddresOrder extends sequelize_typescript_1.Model {
};
exports.AddresOrder = AddresOrder;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], AddresOrder.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], AddresOrder.prototype, "country", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], AddresOrder.prototype, "region", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], AddresOrder.prototype, "city", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], AddresOrder.prototype, "street", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], AddresOrder.prototype, "home", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], AddresOrder.prototype, "flat", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => order_model_1.Order),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], AddresOrder.prototype, "orderId", void 0);
exports.AddresOrder = AddresOrder = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "AddresOrders" })
], AddresOrder);
//# sourceMappingURL=addresOrder.model.js.map