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
exports.GetProduct = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetProduct {
}
exports.GetProduct = GetProduct;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[1,2,3]', description: 'id тегов' }),
    __metadata("design:type", Array)
], GetProduct.prototype, "tags", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[1,2,3]', description: 'id категорий' }),
    __metadata("design:type", Array)
], GetProduct.prototype, "categories", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20', description: 'Минимальная цена' }),
    __metadata("design:type", Number)
], GetProduct.prototype, "min_price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '200', description: 'Миаксимальная цена' }),
    __metadata("design:type", Number)
], GetProduct.prototype, "max_price", void 0);
//# sourceMappingURL=getProduct.dto.js.map