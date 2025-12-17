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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const order_model_1 = require("./order.model");
;
const addresOrder_model_1 = require("./addresOrder.model");
const orderProduct_model_1 = require("./orderProduct.model");
const cart_model_1 = require("../cart/cart.model");
const jwt_1 = require("@nestjs/jwt");
const cart_service_1 = require("../cart/cart.service");
const orderUser_model_1 = require("./orderUser.model");
const product_model_1 = require("../products/product.model");
const coupon_service_1 = require("../coupon/coupon.service");
const coupon_model_1 = require("../coupon/coupon.model");
const AttributeValuea_model_1 = require("../products/AttributeValuea.model");
let OrderService = class OrderService {
    constructor(jwt, cartService, couponService, orders, addresOrder, orderProduct, productRepository, cart, orderUser, couponRepository, attributeValueRepository) {
        this.jwt = jwt;
        this.cartService = cartService;
        this.couponService = couponService;
        this.orders = orders;
        this.addresOrder = addresOrder;
        this.orderProduct = orderProduct;
        this.productRepository = productRepository;
        this.cart = cart;
        this.orderUser = orderUser;
        this.couponRepository = couponRepository;
        this.attributeValueRepository = attributeValueRepository;
    }
    async createOrder(auth, order) {
        try {
            const token = this.jwt.decode(auth.split(' ')[1]);
            const cart = await this.cart.findAll({
                where: {
                    userId: token.id
                }
            });
            const coupon = await this.couponService.checkCoupon(order.couponId);
            const deliv = order.deliv;
            if (deliv == null) {
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: null,
                    payment: order.payment,
                    userId: token.id,
                    couponId: coupon
                });
                for (const el of cart) {
                    const r2 = await this.orderProduct.create({
                        orderId: r1.id,
                        varId: el.varId,
                        count: el.count,
                        productId: el.productId
                    });
                }
                const r4 = await this.orderUser.create({
                    orderId: r1.id,
                    firstName: order.firstName,
                    secondName: order.secondName,
                    phone: Number(order.phone),
                    email: order.email
                });
                await this.cart.destroy({ where: { userId: token.id } });
                return true;
            }
            if (deliv == true) {
                if (!order.country ||
                    !order.region ||
                    !order.city ||
                    !order.street ||
                    !order.home ||
                    !order.flat) {
                    throw new common_1.HttpException("Заполните поля доставки", common_1.HttpStatus.BAD_REQUEST);
                }
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: true,
                    payment: order.payment,
                    userId: token.id,
                    couponId: coupon
                });
                for (const el of cart) {
                    const r2 = await this.orderProduct.create({
                        orderId: r1.id,
                        varId: el.varId,
                        count: el.count,
                        productId: el.productId
                    });
                }
                const r3 = await this.addresOrder.create({
                    country: order.country,
                    region: order.region,
                    city: order.city,
                    street: order.street,
                    home: order.home,
                    flat: order.flat,
                    orderId: r1.id
                });
                const r4 = await this.orderUser.create({
                    orderId: r1.id,
                    firstName: order.firstName,
                    secondName: order.secondName,
                    phone: Number(order.phone),
                    email: order.email
                });
                await this.cart.destroy({ where: { userId: token.id } });
                return true;
            }
            if (deliv == false) {
                if (!order.city ||
                    !order.otd) {
                    throw new common_1.HttpException("Заполните поля доставки", common_1.HttpStatus.BAD_REQUEST);
                }
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: true,
                    payment: order.payment,
                    userId: token.id,
                    couponId: coupon
                });
                for (const el of cart) {
                    const r2 = await this.orderProduct.create({
                        orderId: r1.id,
                        varId: el.varId,
                        count: el.count,
                        productId: el.productId
                    });
                }
                const r3 = await this.addresOrder.create({
                    city: order.city,
                    home: order.otd,
                });
                const r4 = await this.orderUser.create({
                    orderId: r1.id,
                    firstName: order.firstName,
                    secondName: order.secondName,
                    phone: Number(order.phone),
                    email: order.email
                });
                await this.cart.destroy({ where: { userId: token.id } });
                return true;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getOrders(page, limit = 6, vars) {
        try {
            if (vars == 0) {
                const res = await this.orders.findAll({
                    limit,
                    offset: page * limit,
                    where: {
                        orderStatus: 'new'
                    },
                    order: [['id', 'desc']]
                });
                return res;
            }
            if (vars == 1) {
                const res = await this.orders.findAll({
                    limit,
                    offset: page * limit,
                    where: {
                        orderStatus: 'process'
                    },
                    order: [['id', 'desc']]
                });
                return res;
            }
            if (vars == 2) {
                const res = await this.orders.findAll({
                    limit,
                    offset: page * limit,
                    where: {
                        orderStatus: 'closed'
                    },
                    order: [['id', 'desc']]
                });
                return res;
            }
            const res = await this.orders.findAll({
                limit,
                offset: page * limit,
                order: [['id', 'desc']]
            });
            return res;
        }
        catch (error) {
            throw error;
        }
    }
    async getCountPages(limit) {
        try {
            const res = await this.orders.count();
            return Math.floor(res / limit) + 1;
        }
        catch (error) {
            throw error;
        }
    }
    async updateStatus(id, orderStatus) {
        try {
            if (orderStatus == 0) {
                const res = await this.orders.update({ orderStatus: "new" }, {
                    where: {
                        id
                    }
                });
                return true;
            }
            if (orderStatus == 1) {
                const res = await this.orders.update({ orderStatus: "process" }, {
                    where: {
                        id
                    }
                });
                return true;
            }
            if (orderStatus == 2) {
                const res = await this.orders.update({ orderStatus: "closed" }, {
                    where: {
                        id
                    }
                });
                return true;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    }
    async getOrder(id) {
        try {
            const order = await this.orders.findOne({ where: { id } });
            const user = await this.orderUser.findOne({ where: { orderId: order.id } });
            const addres = await this.addresOrder.findOne({ where: { orderId: order.id } });
            const coupon = await this.couponRepository.findOne({
                include: {
                    model: order_model_1.Order,
                    where: {
                        id
                    }
                }
            });
            const products = await this.productRepository.sequelize.query((`select "Variations"."id" as "varsId", "productName","price","sale_price","price","count","varId","AtrributeValue"."attributeValue" as "attributeValue" from (select "Products"."id" as "pId", 
            "Products"."productName" as "productName",  
            "Products"."price" as "price",
            "Products"."sale_price" as "sale_price",
            "OrderProducts"."count" as "count",
            "OrderProducts"."varId" as "varId"
            
            from "Products" INNER JOIN "OrderProducts" ON "Products"."id" = "OrderProducts"."productId"
            inner JOIN "Orders" ON "Orders"."id" = "OrderProducts"."orderId" where "Orders"."id" = ` + id + `) left  join "Variations" on "pId" = "Variations"."productId"
            left join "AtrributeValue" on "AtrributeValue"."id" = "Variations"."attributeValueId"
            where "Variations"."id" is null or "Variations"."id" = "varId"`));
            let sum = 0;
            products[0].map((v) => {
                sum += (v['sale_price'] == 0 ? v['price'] : v['sale_price']) * v['count'];
            });
            return { order, user, addres, products, sum, coupon };
        }
        catch (error) {
            throw error;
        }
    }
    async deleteOrders(ids) {
        const res = await this.orders.count({ where: { id: ids } });
        if (res > 0) {
            try {
                await this.orders.destroy({ where: { id: ids } });
                await this.orderUser.destroy({ where: { orderId: ids } });
                await this.addresOrder.destroy({ where: { orderId: ids } });
                await this.orderProduct.destroy({ where: { orderId: ids } });
                return true;
            }
            catch (error) {
                throw error;
            }
        }
        else {
            throw new common_1.HttpException('Выделите элементы для удаления', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, sequelize_1.InjectModel)(order_model_1.Order)),
    __param(4, (0, sequelize_1.InjectModel)(addresOrder_model_1.AddresOrder)),
    __param(5, (0, sequelize_1.InjectModel)(orderProduct_model_1.OrderProduct)),
    __param(6, (0, sequelize_1.InjectModel)(product_model_1.Product)),
    __param(7, (0, sequelize_1.InjectModel)(cart_model_1.Cart)),
    __param(8, (0, sequelize_1.InjectModel)(orderUser_model_1.OrderUser)),
    __param(9, (0, sequelize_1.InjectModel)(coupon_model_1.Coupon)),
    __param(10, (0, sequelize_1.InjectModel)(AttributeValuea_model_1.AttributeValue)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        cart_service_1.CartService,
        coupon_service_1.CouponService, Object, Object, Object, Object, Object, Object, Object, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map