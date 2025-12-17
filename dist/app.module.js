"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const role_module_1 = require("./role/role.module");
const filters_module_1 = require("./filters/filters.module");
const products_module_1 = require("./products/products.module");
const sequelize_1 = require("@nestjs/sequelize");
const category_model_1 = require("./filters/category.model");
const color_model_1 = require("./filters/color.model");
const group_model_1 = require("./filters/group.model");
const tag_model_1 = require("./filters/tag.model");
const attributes_model_1 = require("./products/attributes.model");
const AttributeValuea_model_1 = require("./products/AttributeValuea.model");
const product_model_1 = require("./products/product.model");
const role_model_1 = require("./role/role.model");
const RolesUser_model_1 = require("./role/RolesUser.model");
const user_model_1 = require("./user/user.model");
const cart_module_1 = require("./cart/cart.module");
const order_module_1 = require("./order/order.module");
const cart_model_1 = require("./cart/cart.model");
const coupon_model_1 = require("./coupon/coupon.model");
const CategoryProduct_model_1 = require("./filters/CategoryProduct.model");
const TagProduct_model_1 = require("./filters/TagProduct.model");
const addresOrder_model_1 = require("./order/addresOrder.model");
const order_model_1 = require("./order/order.model");
const orderProduct_model_1 = require("./order/orderProduct.model");
const AttributeProduct_model_1 = require("./products/AttributeProduct.model");
const user_module_1 = require("./user/user.module");
const coupon_module_1 = require("./coupon/coupon.module");
const files_module_1 = require("./files/files.module");
const preview_model_1 = require("./products/preview.model");
const gallery_model_1 = require("./products/gallery.model");
const path = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const variations_model_1 = require("./products/variations.model");
const recommendationProduct_model_1 = require("./products/recommendationProduct.model");
const orderUser_model_1 = require("./order/orderUser.model");
const analitycs_module_1 = require("./analitycs/analitycs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: 'admin',
                database: 'Shop',
                models: [cart_model_1.Cart, coupon_model_1.Coupon, category_model_1.Category, CategoryProduct_model_1.CategoryProduct, color_model_1.Colors, group_model_1.Group, tag_model_1.Tag, TagProduct_model_1.TagProduct, addresOrder_model_1.AddresOrder, order_model_1.Order, orderProduct_model_1.OrderProduct, orderUser_model_1.OrderUser, attributes_model_1.Attribute, AttributeValuea_model_1.AttributeValue, AttributeProduct_model_1.AttributeProduct,
                    product_model_1.Product, role_model_1.Role, RolesUser_model_1.RolesUser, user_model_1.User, preview_model_1.Previews, gallery_model_1.Gallery, variations_model_1.Variations, recommendationProduct_model_1.RecommendationProducts],
                autoLoadModels: true
            }),
            role_module_1.RoleModule, filters_module_1.FiltersModule, products_module_1.ProductsModule, cart_module_1.CartModule, order_module_1.OrderModule, user_module_1.UserModule, coupon_module_1.CouponModule, files_module_1.FilesModule,
            serve_static_1.ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, '..', 'static') }),
            analitycs_module_1.AnalitycsModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map