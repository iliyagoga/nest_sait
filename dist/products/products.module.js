"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const attributes_model_1 = require("./attributes.model");
const product_model_1 = require("./product.model");
const sequelize_1 = require("@nestjs/sequelize");
const AttributeValuea_model_1 = require("./AttributeValuea.model");
const filters_module_1 = require("../filters/filters.module");
const AttributeProduct_model_1 = require("./AttributeProduct.model");
const CategoryProduct_model_1 = require("../filters/CategoryProduct.model");
const TagProduct_model_1 = require("../filters/TagProduct.model");
const cart_model_1 = require("../cart/cart.model");
const jwt_1 = require("@nestjs/jwt");
const files_service_1 = require("../files/files.service");
const preview_model_1 = require("./preview.model");
const gallery_model_1 = require("./gallery.model");
const tag_model_1 = require("../filters/tag.model");
const category_model_1 = require("../filters/category.model");
const group_model_1 = require("../filters/group.model");
const variations_model_1 = require("./variations.model");
const recommendationProduct_model_1 = require("./recommendationProduct.model");
const user_model_1 = require("../user/user.model");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([attributes_model_1.Attribute, product_model_1.Product, AttributeValuea_model_1.AttributeValue, AttributeProduct_model_1.AttributeProduct, CategoryProduct_model_1.CategoryProduct, TagProduct_model_1.TagProduct, cart_model_1.Cart, preview_model_1.Previews, gallery_model_1.Gallery, tag_model_1.Tag, category_model_1.Category, group_model_1.Group, variations_model_1.Variations, recommendationProduct_model_1.RecommendationProducts, user_model_1.User]), filters_module_1.FiltersModule],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService, jwt_1.JwtService, files_service_1.FilesService],
        exports: [ProductsModule]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map