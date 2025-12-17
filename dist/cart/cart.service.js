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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_model_1 = require("./cart.model");
const sequelize_1 = require("@nestjs/sequelize");
const product_model_1 = require("../products/product.model");
const jwt_1 = require("@nestjs/jwt");
const variations_model_1 = require("../products/variations.model");
const attributes_model_1 = require("../products/attributes.model");
const coupon_model_1 = require("../coupon/coupon.model");
let CartService = class CartService {
    constructor(cartRepository, productRepositury, varsRepositury, attrRepository, couponRepository, jwt) {
        this.cartRepository = cartRepository;
        this.productRepositury = productRepositury;
        this.varsRepositury = varsRepositury;
        this.attrRepository = attrRepository;
        this.couponRepository = couponRepository;
        this.jwt = jwt;
    }
    async getCart(hs) {
        const token = this.jwt.decode(hs.split(' ')[1]);
        try {
            const res = await this.productRepositury.sequelize.query(`(
            select "Products"."id" as "productId", 
            "Products"."productName" as "productName", 
            "Products"."price" as "productPrice",
            "Products"."sale_price" as "productSalePrice",
            "Products"."createdAt" as "createdAt",
            "Previews"."title" as "previewTitle",
            "Carts"."id" as "cartId",
            "Carts"."userId" as "cartUserId",
            "Carts"."productId" as "cartProductId",
            "Carts"."varId" as "cartVarId",
            "Carts"."count" as "count",
            "AtrributeValue"."id" as "attrValId",
            "AtrributeValue"."attributeValue" as "attributeValue"


            from "Products" left join "Previews" on "Previews"."productId" = "Products"."id" inner join "Carts" on "Products"."id" = "Carts"."productId" 
            left join "Variations" on "Variations"."id" = "Carts"."varId" left join "AtrributeValue" on "Variations"."attributeValueId" = "AtrributeValue"."id" where "Carts"."userId"=
            ` + token.id + ` order by "Products"."id" desc)`);
            const attrs = await this.attrRepository.sequelize.query(`(
                select "AtrributeValue"."id" as "id", 
                "AtrributeValue"."attributeValue",
                "Variations"."productId" as "productId",
                "Variations"."attributeValueId" as "attributeValueId",
                "Variations"."id" as "varId"
                from "AtrributeValue" inner join "Variations" on "AtrributeValue"."id" = "Variations"."attributeValueId" order by "id"
            )`);
            return { res, attrs };
        }
        catch (error) {
            throw error;
        }
    }
    async addToCart(dto, hs) {
        try {
            const pr = await this.varsRepositury.findOne({ where: { productId: dto.productId } });
            const token = this.jwt.decode(hs.split(' ')[1]);
            if (pr) {
                console.log(dto);
                if (dto.varId) {
                    const r = await this.cartRepository.findOne({
                        where: {
                            productId: dto.productId,
                            userId: token.id,
                            varId: dto.varId
                        }
                    });
                    if (r) {
                        throw new common_1.HttpException("Вы уже добавили данный товар в корзину", common_1.HttpStatus.BAD_REQUEST);
                    }
                    return await this.cartRepository.create({
                        productId: dto.productId,
                        userId: token.id,
                        varId: dto.varId,
                        count: dto.count
                    });
                }
                else {
                    throw new common_1.HttpException("Выберите атрибут товара", common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                const r = await this.cartRepository.findOne({
                    where: {
                        productId: dto.productId,
                        userId: token.id,
                    }
                });
                if (r) {
                    throw new common_1.HttpException("Вы уже добавили данный товар в корзину", common_1.HttpStatus.BAD_REQUEST);
                }
                return await this.cartRepository.create({
                    productId: dto.productId,
                    userId: token.id,
                    count: dto.count
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async removeFromCart(dto) {
        try {
            return await this.cartRepository.destroy({ where: { ...dto } });
        }
        catch (error) {
            throw error;
        }
    }
    async plusCount(productId, varId, hs) {
        try {
            const token = this.jwt.decode(hs.split(' ')[1]);
            const product = await this.cartRepository.findOne({
                where: {
                    productId: productId,
                    varId: varId,
                    userId: token['id']
                }
            });
            return await this.cartRepository.update({ count: product.count + 1 }, { where: {
                    productId: productId,
                    varId: varId
                } });
        }
        catch (error) {
            throw error;
        }
    }
    async minusCount(productId, varId, hs) {
        try {
            const token = this.jwt.decode(hs.split(' ')[1]);
            const product = await this.cartRepository.findOne({
                where: {
                    productId: productId,
                    varId: varId,
                    userId: token['id']
                }
            });
            if (product.count > 1) {
                return await this.cartRepository.update({ count: product.count - 1 }, { where: {
                        productId: productId,
                        varId: varId
                    } });
            }
            else {
                throw new common_1.HttpException("Ошибка", common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async countAll(hs) {
        try {
            const token = this.jwt.decode(hs.split(' ')[1]);
            let cart = await this.productRepositury.count({
                include: {
                    model: cart_model_1.Cart,
                    where: { userId: token['id'] }
                }
            });
            return cart;
        }
        catch (error) {
            throw error;
        }
    }
    async sum(auth) {
        let sum = 0;
        const { res, attrs } = await this.getCart(auth);
        res.map(v => {
            if (Number(v['sale_price'] > 0)) {
                sum += v['sale_price'] * v['cart'][0].count;
            }
            else {
                sum += v['price'] * v['cart'][0].count;
            }
        });
        return sum;
    }
    async getCoupon(coupon, auth) {
        const res = await this.couponRepository.findOne({
            where: {
                couponTitle: coupon
            }
        });
        if (res) {
            if (await this.sum(auth) >= Number(res.couponValue)) {
                return { value: res.couponValue, id: res.id };
            }
            return { value: 0, id: null };
        }
        return { value: 0, id: null };
    }
    async changeVars(productId, varId, newVarId, hs) {
        try {
            if (newVarId != null) {
                const token = this.jwt.decode(hs.split(' ')[1]);
                const res = await this.cartRepository.update({ varId: newVarId }, { where: { userId: token.id, productId, varId } });
                return res;
            }
            throw new common_1.HttpException("Выберите вариацию", common_1.HttpStatus.BAD_REQUEST);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __param(1, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(2, (0, sequelize_1.InjectModel)(variations_model_1.Variations)),
    __param(3, (0, sequelize_1.InjectModel)(attributes_model_1.Attribute)),
    __param(4, (0, sequelize_1.InjectModel)(coupon_model_1.Coupon)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, jwt_1.JwtService])
], CartService);
//# sourceMappingURL=cart.service.js.map