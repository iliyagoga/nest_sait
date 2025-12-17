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
exports.RedactProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RedactProductDto {
}
exports.RedactProductDto = RedactProductDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id продукта' }),
    (0, class_validator_1.IsNumber)({}, { message: "Должно быть числом" }),
    __metadata("design:type", Number)
], RedactProductDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Гантель', description: 'Название товара' }),
    __metadata("design:type", String)
], RedactProductDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '...', description: 'Краткое описание товара' }),
    __metadata("design:type", String)
], RedactProductDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '..........', description: 'Описание товара' }),
    __metadata("design:type", String)
], RedactProductDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1000', description: 'Цена товара' }),
    __metadata("design:type", Number)
], RedactProductDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '200', description: 'Акционная цена товара' }),
    __metadata("design:type", Number)
], RedactProductDto.prototype, "sale_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[1,2,3,4]', description: 'id категорий' }),
    __metadata("design:type", Array)
], RedactProductDto.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[1,2,3,4]', description: 'id тегов' }),
    __metadata("design:type", Array)
], RedactProductDto.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[1,2,3,4]', description: 'id атрибутов' }),
    __metadata("design:type", Array)
], RedactProductDto.prototype, "attributes", void 0);
//# sourceMappingURL=redact-product.dto.js.map