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
exports.CategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CategoryDto {
}
exports.CategoryDto = CategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Футболки', description: 'Наименование категории' }),
    (0, class_validator_1.IsEmpty)({ message: "Значение не должно быть пустым" }),
    (0, class_validator_1.IsString)({ message: "Значение должно быть строкой" }),
    __metadata("design:type", String)
], CategoryDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id группы категорий' }),
    (0, class_validator_1.IsNumber)({}, { message: "Значение должно быть числом" }),
    (0, class_validator_1.IsEmpty)({ message: "Значение не должно быть пустым" }),
    __metadata("design:type", Number)
], CategoryDto.prototype, "groupId", void 0);
//# sourceMappingURL=category.dto.js.map