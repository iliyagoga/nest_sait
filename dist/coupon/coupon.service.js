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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const coupon_model_1 = require("./coupon.model");
let CouponService = class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async createCoupon(dto) {
        if (dto.couponTitle != undefined && dto.couponTitle.length > 0) {
            if (dto.couponValue != undefined && Number.isInteger(Number(dto.couponValue)) && Number(dto.couponValue) > 0) {
                if (dto.couponTimelife) {
                    try {
                        return await this.couponRepository.create(dto);
                    }
                    catch (error) {
                        throw new common_1.HttpException('Такой купон уже есть', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else {
                    throw new common_1.HttpException('Укажите окончание действия купона', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('Укажите цену купона', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Имя купона не должно быть пустым', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async removeCoupon(ids) {
        const res = await this.couponRepository.count({ where: { id: ids } });
        if (res > 0) {
            return await this.couponRepository.destroy({
                where: {
                    id: ids
                }
            });
        }
        else {
            throw new common_1.HttpException('Выделите элементы для удаления', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async redactCoupon(dto) {
        if (dto.couponTitle != undefined && dto.couponTitle.length > 0) {
            if (dto.couponValue != undefined && Number.isInteger(Number(dto.couponValue)) && Number(dto.couponValue) > 0) {
                if (dto.couponTimelife) {
                    try {
                        return await this.couponRepository.update({ couponTitle: dto.couponTitle,
                            couponValue: dto.couponValue,
                            couponTimelife: dto.couponTimelife
                        }, {
                            where: {
                                id: dto.id
                            }
                        });
                    }
                    catch (error) {
                        throw new common_1.HttpException('Такой купон уже есть', common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                else {
                    throw new common_1.HttpException('Укажите окончание действия купона', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                throw new common_1.HttpException('Укажите цену купона', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            throw new common_1.HttpException('Имя купона не должно быть пустым', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getCoupons() {
        return await this.couponRepository.findAll();
    }
    async getCouponsLimit(page, limit, order) {
        let o;
        if (order == 'true') {
            o = true;
        }
        if (order == 'false') {
            o = false;
        }
        if (o === true) {
            const res = await this.couponRepository.findAll({
                offset: limit * page,
                limit,
                order: [['couponTimelife', 'desc']]
            });
            return res;
        }
        if (o === false) {
            const res = await this.couponRepository.findAll({
                offset: limit * page,
                limit,
                order: [['couponTimelife', 'asc']]
            });
            return res;
        }
        const res = await this.couponRepository.findAll({
            offset: limit * page,
            limit,
            order: [['id', 'desc']]
        });
        return res;
    }
    async getCouponsPages(limit) {
        return Math.floor(await this.couponRepository.count() / limit) + 1;
    }
    async checkCoupon(id) {
        const c = await this.couponRepository.findOne({ where: { id } });
        if (c) {
            return c.id;
        }
        return null;
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(coupon_model_1.Coupon)),
    __metadata("design:paramtypes", [Object])
], CouponService);
//# sourceMappingURL=coupon.service.js.map