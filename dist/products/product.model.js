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
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const CategoryProduct_model_1 = require("../filters/CategoryProduct.model");
const category_model_1 = require("../filters/category.model");
const AttributeValuea_model_1 = require("./AttributeValuea.model");
const AttributeProduct_model_1 = require("./AttributeProduct.model");
const tag_model_1 = require("../filters/tag.model");
const TagProduct_model_1 = require("../filters/TagProduct.model");
const user_model_1 = require("../user/user.model");
const cart_model_1 = require("../cart/cart.model");
const orderProduct_model_1 = require("../order/orderProduct.model");
const preview_model_1 = require("./preview.model");
const gallery_model_1 = require("./gallery.model");
const variations_model_1 = require("./variations.model");
const recommendationProduct_model_1 = require("./recommendationProduct.model");
const order_model_1 = require("../order/order.model");
const swagger_1 = require("@nestjs/swagger");
let Product = class Product extends sequelize_typescript_1.Model {
};
exports.Product = Product;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id продукта' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Гантель', description: 'Название товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '...', description: 'Краткое описание товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT, allowNull: false }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '..........', description: 'Описание товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1000', description: 'Цена товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '200', description: 'Акционная цена товара' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER }),
    __metadata("design:type", Number)
], Product.prototype, "sale_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '-', description: '-' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.TEXT }),
    __metadata("design:type", String)
], Product.prototype, "mean_image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '-', description: '-' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '-', description: '-' }),
    (0, sequelize_typescript_1.Column)({ type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "ratingCount", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => category_model_1.Category, () => CategoryProduct_model_1.CategoryProduct),
    __metadata("design:type", Array)
], Product.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => AttributeValuea_model_1.AttributeValue, () => AttributeProduct_model_1.AttributeProduct),
    __metadata("design:type", Array)
], Product.prototype, "attributeValue", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tag_model_1.Tag, () => TagProduct_model_1.TagProduct),
    __metadata("design:type", Array)
], Product.prototype, "tag", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => user_model_1.User, () => cart_model_1.Cart),
    __metadata("design:type", Array)
], Product.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => orderProduct_model_1.OrderProduct),
    __metadata("design:type", Array)
], Product.prototype, "orderProduct", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => cart_model_1.Cart),
    __metadata("design:type", Array)
], Product.prototype, "cart", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => preview_model_1.Previews),
    __metadata("design:type", Array)
], Product.prototype, "previews", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => gallery_model_1.Gallery),
    __metadata("design:type", Array)
], Product.prototype, "gallery", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => variations_model_1.Variations),
    __metadata("design:type", Array)
], Product.prototype, "variations", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => recommendationProduct_model_1.RecommendationProducts),
    __metadata("design:type", Array)
], Product.prototype, "recommendationProducts", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => order_model_1.Order, () => orderProduct_model_1.OrderProduct),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
exports.Product = Product = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "Products" })
], Product);
//# sourceMappingURL=product.model.js.map