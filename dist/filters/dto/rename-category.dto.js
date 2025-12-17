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
exports.RenameCategoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RenameCategoryDto {
}
exports.RenameCategoryDto = RenameCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Футболки', description: 'Наименование категории' }),
    (0, class_validator_1.IsString)({ message: "Значение должно быть строкой" }),
    __metadata("design:type", String)
], RenameCategoryDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'id категории' }),
    (0, class_validator_1.IsNumber)({}, { message: "Значение должно быть числом" }),
    __metadata("design:type", Number)
], RenameCategoryDto.prototype, "id", void 0);
//# sourceMappingURL=rename-category.dto.js.map