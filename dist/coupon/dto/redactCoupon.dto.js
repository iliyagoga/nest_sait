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
exports.RedactCouponDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RedactCouponDto {
}
exports.RedactCouponDto = RedactCouponDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'id купона' }),
    (0, class_validator_1.IsEmpty)({ message: "Значение не должно быть пустым" }),
    (0, class_validator_1.IsNumber)({}, { message: "Значнеие должно быть числом" }),
    __metadata("design:type", Number)
], RedactCouponDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'весна2024', description: 'Название купона' }),
    __metadata("design:type", String)
], RedactCouponDto.prototype, "couponTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2000', description: 'Скидка купона' }),
    __metadata("design:type", String)
], RedactCouponDto.prototype, "couponValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-04-13 00:46:13.636+04', description: 'Время жизни купона' }),
    __metadata("design:type", Number)
], RedactCouponDto.prototype, "couponTimelife", void 0);
//# sourceMappingURL=redactCoupon.dto.js.map