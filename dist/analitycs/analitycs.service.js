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
exports.AnalitycsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const coupon_model_1 = require("../coupon/coupon.model");
const order_model_1 = require("../order/order.model");
const preview_model_1 = require("../products/preview.model");
const product_model_1 = require("../products/product.model");
const user_model_1 = require("../user/user.model");
let AnalitycsService = class AnalitycsService {
    constructor(orderRepository, userRepository, productRepository, couponRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.couponRepository = couponRepository;
    }
    async getOrder(mode) {
        if (mode == 'w') {
            const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            let arr = [];
            for (let i = 1; i < 8; i++) {
                arr.push({ label: new Date(Date.now() - (8 - i) * 24 * 60 * 60 * 1000), orders: [] });
            }
            const res = await this.orderRepository.findAll({
                where: {
                    createdAt: { [sequelize_2.Op.gte]: date.getTime() }
                }
            });
            for (let el of res) {
                for (let o of arr) {
                    if (o.label.getDate() == new Date(el.createdAt).getDate()) {
                        o.orders.push(el);
                    }
                }
            }
            return { labels: arr.map(v => {
                    return new Date(v.label).getDate();
                }), values: arr.map(v => {
                    return v.orders.length;
                }) };
        }
        if (mode == 'm') {
            const mDays = new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth() + 1, 0).getDate();
            const date = new Date(Date.now() - mDays * 24 * 60 * 60 * 1000);
            let arr = [];
            for (let i = 1; i < mDays; i++) {
                arr.push({ label: new Date(Date.now() - (mDays - i) * 24 * 60 * 60 * 1000), orders: [] });
            }
            const res = await this.orderRepository.findAll({
                where: {
                    createdAt: { [sequelize_2.Op.gte]: date.getTime() }
                }
            });
            for (let el of res) {
                for (let o of arr) {
                    if (o.label.getDate() == new Date(el.createdAt).getDate() && new Date(el.createdAt).getMonth() == o.label.getMonth()) {
                        o.orders.push(el);
                    }
                }
            }
            return { labels: arr.map(v => {
                    return new Date(v.label).getDate();
                }), values: arr.map(v => {
                    return v.orders.length;
                }) };
        }
        if (mode == 'y') {
            const date = new Date(Date.now() - 12 * 30 * 24 * 60 * 60 * 1000);
            let arr = [];
            for (let i = 1; i < 13; i++) {
                arr.push({ label: i, orders: [] });
            }
            const res = await this.orderRepository.findAll({
                where: {
                    createdAt: { [sequelize_2.Op.gt]: date.getTime() }
                }
            });
            for (let el of res) {
                for (let o of arr) {
                    if (new Date(el.createdAt).getMonth() + 1 == o.label) {
                        o.orders.push(el);
                    }
                }
            }
            return { labels: arr.map(v => {
                    return v.label;
                }), values: arr.map(v => {
                    return v.orders.length;
                }) };
        }
        return null;
    }
    async getCountUsers() {
        try {
            const res = await this.userRepository.count();
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getTopProduct(limit) {
        try {
            const res = await this.productRepository.findAll({
                include: { model: preview_model_1.Previews },
                attributes: {
                    include: [[sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) from "OrderProducts" where "OrderProducts"."productId"="Product"."id" )`), 'count']]
                },
                order: [['count', 'desc']],
                group: ['id'],
                limit
            });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getTopCategory(limit) {
        try {
            const res = await this.productRepository.sequelize.query(`(
                SELECT "categoryName" from "Categories" where "Categories"."id" in (
                    SELECT "id" from (
                    SELECT "CategoryProduct"."id" as "id", count("OrderProducts"."productId") as "count"  from "CategoryProduct" inner join "OrderProducts" on "CategoryProduct"."productId" = "OrderProducts"."productId" group by "CategoryProduct"."id" order by "count" desc
                )
                   ) limit ` + limit + `
            )`);
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getTopCoupons(limit) {
        try {
            const res = await this.couponRepository.findAll({
                include: { model: order_model_1.Order, required: true },
                attributes: {
                    include: [[sequelize_typescript_1.Sequelize.literal(`(SELECT COUNT(*) from "Orders" where "Orders"."couponId"="Coupon"."id" )`), 'count']]
                },
                order: [['count', 'desc']],
                group: ['id'],
                limit
            });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AnalitycsService = AnalitycsService;
exports.AnalitycsService = AnalitycsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(order_model_1.Order)),
    __param(1, (0, sequelize_1.InjectModel)(user_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(3, (0, sequelize_1.InjectModel)(coupon_model_1.Coupon)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], AnalitycsService);
//# sourceMappingURL=analitycs.service.js.map