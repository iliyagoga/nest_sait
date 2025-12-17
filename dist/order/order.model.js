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
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("../user/user.model");
const addresOrder_model_1 = require("./addresOrder.model");
const orderProduct_model_1 = require("./orderProduct.model");
const coupon_model_1 = require("../coupon/coupon.model");
const orderUser_model_1 = require("./orderUser.model");
const product_model_1 = require("../products/product.model");
const swagger_1 = require("@nestjs/swagger");
let Order = class Order extends sequelize_typescript_1.Model {
};
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id заказа' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'open/process/closed', description: 'Статус заказа' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Order.prototype, "orderStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Комментарий', description: 'Комментарий' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], Order.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true/false/null', description: 'Вид доставки' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN }),
    __metadata("design:type", Boolean)
], Order.prototype, "deliv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true/false/null', description: 'Вид оплаты' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.BOOLEAN }),
    __metadata("design:type", Boolean)
], Order.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id таблицу Users' }),
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Order.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'id купона' }),
    (0, sequelize_typescript_1.ForeignKey)(() => coupon_model_1.Coupon),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Order.prototype, "couponId", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => addresOrder_model_1.AddresOrder),
    __metadata("design:type", Array)
], Order.prototype, "addresOrder", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => orderProduct_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "orderProduct", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => orderUser_model_1.OrderUser),
    __metadata("design:type", Array)
], Order.prototype, "orderUser", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => product_model_1.Product, () => orderProduct_model_1.OrderProduct),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
exports.Order = Order = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Orders" })
], Order);
//# sourceMappingURL=order.model.js.map