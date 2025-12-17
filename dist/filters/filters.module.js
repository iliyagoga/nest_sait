"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiltersModule = void 0;
const common_1 = require("@nestjs/common");
const filters_controller_1 = require("./filters.controller");
const filters_service_1 = require("./filters.service");
const tag_model_1 = require("./tag.model");
const group_model_1 = require("./group.model");
const category_model_1 = require("./category.model");
const sequelize_1 = require("@nestjs/sequelize");
const CategoryProduct_model_1 = require("./CategoryProduct.model");
const jwt_1 = require("@nestjs/jwt");
const user_model_1 = require("../user/user.model");
let FiltersModule = class FiltersModule {
};
exports.FiltersModule = FiltersModule;
exports.FiltersModule = FiltersModule = __decorate([
    (0, common_1.Module)({
        controllers: [filters_controller_1.FiltersController],
        imports: [sequelize_1.SequelizeModule.forFeature([tag_model_1.Tag, group_model_1.Group, category_model_1.Category, CategoryProduct_model_1.CategoryProduct, user_model_1.User])],
        providers: [filters_service_1.FiltersService, jwt_1.JwtService],
    })
], FiltersModule);
//# sourceMappingURL=filters.module.js.map