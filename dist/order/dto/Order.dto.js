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
exports.OrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class OrderDto {
}
exports.OrderDto = OrderDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Имя', description: 'Имя' }),
    (0, class_validator_1.MinLength)(1, { message: "Поле не должно быть пустым" }),
    __metadata("design:type", String)
], OrderDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Фамилия', description: 'Фамилия' }),
    (0, class_validator_1.MinLength)(1, { message: "Поле не должно быть пустым" }),
    __metadata("design:type", String)
], OrderDto.prototype, "secondName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ttt@ttt.tt', description: 'Почта' }),
    (0, class_validator_1.MinLength)(1, { message: "Поле не должно быть пустым" }),
    __metadata("design:type", String)
], OrderDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '111111', description: 'Номер телефона' }),
    (0, class_validator_1.MinLength)(1, { message: "Поле не должно быть пустым" }),
    __metadata("design:type", String)
], OrderDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Комментарий', description: 'Комментарий' }),
    __metadata("design:type", String)
], OrderDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true/false/null', description: 'Вид доставки' }),
    __metadata("design:type", Boolean)
], OrderDto.prototype, "deliv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'true/false/null', description: 'Вид оплаты' }),
    __metadata("design:type", Boolean)
], OrderDto.prototype, "payment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Страна', description: 'Страна' }),
    __metadata("design:type", String)
], OrderDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Регион', description: 'Область, округ, штат' }),
    __metadata("design:type", String)
], OrderDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Город', description: 'Город' }),
    __metadata("design:type", String)
], OrderDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Улица', description: 'Улица' }),
    __metadata("design:type", String)
], OrderDto.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8', description: 'Номер дома' }),
    __metadata("design:type", String)
], OrderDto.prototype, "home", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '11', description: 'Номер квартиры' }),
    __metadata("design:type", String)
], OrderDto.prototype, "flat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Отдел почты', description: 'Отдел почты' }),
    __metadata("design:type", String)
], OrderDto.prototype, "otd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2', description: 'id купона' }),
    __metadata("design:type", Number)
], OrderDto.prototype, "couponId", void 0);
//# sourceMappingURL=Order.dto.js.map