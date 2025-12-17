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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const attribute_dto_1 = require("./dto/attribute.dto");
const product_dto_1 = require("./dto/product.dto");
const attributeValue_dto_1 = require("./dto/attributeValue.dto");
const jwt_auth_guard_1 = require("../user/jwt-auth.guard");
const rename_attributeValue_dto_1 = require("./dto/rename-attributeValue.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const attributes_model_1 = require("./attributes.model");
const AttributeValuea_model_1 = require("./AttributeValuea.model");
const product_model_1 = require("./product.model");
const gallery_model_1 = require("./gallery.model");
const roles_guard_1 = require("../role/roles.guard");
const roles_auth_decoration_1 = require("../role/roles-auth.decoration");
let ProductsController = class ProductsController {
    constructor(productService) {
        this.productService = productService;
    }
    async createAttribute(dto) {
        return this.productService.createAttribute(dto);
    }
    async renameAttribute(dto) {
        return this.productService.renameAttribute(dto);
    }
    async deleteAttribute(body) {
        return this.productService.deleteAttribute(body['id']);
    }
    async createAttributeValue(dto) {
        return this.productService.createAttributeValue(dto);
    }
    async deleteAttributeValue(body) {
        return this.productService.deleteAttributeValue(body['id']);
    }
    async renameAttributeValue(dto) {
        return this.productService.renameAttributeValue(dto);
    }
    async createProduct(images, dto) {
        if (dto.productName.length > 0 && dto.productName.length > 0) {
            return this.productService.createProduct(dto, images);
        }
        throw new common_1.HttpException("Имя и короткое описание продукта должны быть заполнены", common_1.HttpStatus.BAD_REQUEST);
    }
    async createGalleryProduct(images, dto) {
        return this.productService.createGalleryProduct(images, dto);
    }
    async redactProduct(images, dto) {
        return this.productService.redactProduct(dto, images);
    }
    async updateGalleryProduct(images, dto) {
        return this.productService.updateGalleryProduct(images, dto);
    }
    async deleteProduct(data) {
        return this.productService.deleteProduct(data["id"]);
    }
    async getProducts(pars) {
        return this.productService.getProducts(pars);
    }
    async getProduct(id) {
        return this.productService.getProduct(Number(id));
    }
    async getPhotos() {
        return this.productService.getPhotos();
    }
    async getProductCountPages(pars) {
        return this.productService.getProductCountPages(pars);
    }
    async getAttributes(page) {
        return this.productService.getAttributes(page);
    }
    async getAttributesLimit(page, limit) {
        return this.productService.getAttributes(page, limit);
    }
    async getCountAttributesPages() {
        return this.productService.getCountAttributesPages();
    }
    async getAttributesValues(id, page) {
        return this.productService.getAttributesValues(id, page);
    }
    async getAttributesValuesLimit(id, page, limit) {
        return this.productService.getAttributesValues(id, page, limit);
    }
    async getCountAttributeValuesPages(attributeId) {
        return this.productService.getCountAttributeValuesPages(attributeId);
    }
    async getProductsCats(params) {
        return this.productService.getProductsCats(params);
    }
    async getProductsDef(params) {
        return this.productService.getProductsDef(params);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание атрибута' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: attributes_model_1.Attribute }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/createAttribute'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attribute_dto_1.AttributeDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createAttribute", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Переименование атрибута' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: attributes_model_1.Attribute }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/renameAttribute'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rename_attributeValue_dto_1.RenameAttributeValue]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "renameAttribute", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление атрибута' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: attributes_model_1.Attribute }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/deleteAttribute'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteAttribute", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание значения атрибута' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: AttributeValuea_model_1.AttributeValue }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/createAttributeValue'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [attributeValue_dto_1.AttributeValueDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createAttributeValue", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление значения атрибута' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: AttributeValuea_model_1.AttributeValue }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/deleteAttributeValue'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteAttributeValue", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Переименование значения атрибута' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: AttributeValuea_model_1.AttributeValue }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)('/renameAttributeValue'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [rename_attributeValue_dto_1.RenameAttributeValue]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "renameAttributeValue", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('img')),
    (0, common_1.Post)("/createProduct"),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание галереи товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: gallery_model_1.Gallery }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('img')),
    (0, common_1.Post)("/createGalleryProduct"),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createGalleryProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Редактирование товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('img')),
    (0, common_1.Post)("/redactProduct"),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "redactProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Редактирование галереи товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: gallery_model_1.Gallery }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('img')),
    (0, common_1.Post)("/updateGalleryProduct"),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, product_dto_1.ProductDto]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateGalleryProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Редактирование товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: gallery_model_1.Gallery }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Post)("/deleteProduct"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка товаров (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getProducts/:page/:limit/:price/:rating/:search'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProducts", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение информации о товаре' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.Get)('/getProduct/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение изображений товара' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: gallery_model_1.Gallery }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getPhotos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getPhotos", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества страниц с строками товаров (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getProductCountPages/:limit/:price/:rating/:search'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductCountPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка атрибутов постранично' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: attributes_model_1.Attribute }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getAttributes/:num'),
    __param(0, (0, common_1.Param)('num')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAttributes", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение списка атрибутов постранично (c limit строк на странице)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: attributes_model_1.Attribute }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getAttributes/:num/:limit'),
    __param(0, (0, common_1.Param)('num')),
    __param(1, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAttributesLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества страниц атрибутов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCountAttributesPages'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCountAttributesPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение строк со сзначениями атрибутов (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: AttributeValuea_model_1.AttributeValue }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getAttributesValues/:id/:page'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAttributesValues", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение строк со сзначениями атрибутов (с фильтрами и limit)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: AttributeValuea_model_1.AttributeValue }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getAttributesValues/:id/:page/:limit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getAttributesValuesLimit", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение количества страниц значений атрибутов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: Number }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, roles_auth_decoration_1.Roles)('ADMIN', 'SUPERUSER'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.Get)('/getCountAttributeValuesPages/:attributeId'),
    __param(0, (0, common_1.Param)('attributeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getCountAttributeValuesPages", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение товаров по категориям (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.Get)('/getProductsClientCats/:idGroup/:idCategory/:price/:rating/:order/:limit/:offset'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductsCats", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение товаров (с фильтрами)' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: product_model_1.Product }),
    (0, common_1.Get)('/getProductsClient/:price/:rating/:order/:limit/:offset/:search'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "getProductsDef", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Товары'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map