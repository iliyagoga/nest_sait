import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/Order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';;
import { AddresOrder } from './addresOrder.model';
import { OrderProduct } from './orderProduct.model';
import { Cart } from 'src/cart/cart.model';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { OrderUser } from './orderUser.model'
import { Product } from 'src/products/product.model';
import { CouponService } from 'src/coupon/coupon.service';
import { Coupon } from 'src/coupon/coupon.model';

@Injectable()
export class OrderService {
    constructor(
        private jwt: JwtService,
        private cartService: CartService,
        private couponService: CouponService,
        @InjectModel(Order) private orders: typeof Order,
        @InjectModel(AddresOrder) private addresOrder: typeof AddresOrder,
        @InjectModel(OrderProduct) private orderProduct: typeof OrderProduct,
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Cart) private cart: typeof Cart,
        @InjectModel(OrderUser) private orderUser: typeof OrderUser,
        @InjectModel(Coupon) private couponRepository: typeof Coupon
    ){}

    async createOrder(auth: string, order: OrderDto){
       
        try {
            const token = this.jwt.decode(auth.split(' ')[1])
            const cart = await this.cart.findAll({
                where:{
                    userId: token.id
                }
            })
            const coupon= await this.couponService.checkCoupon(order.couponId)

            const deliv = order.deliv;
            if(deliv==null){
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: null,
                    payment: order.payment,
                    userId: token.id,
                    couponId: coupon
                })
                for( const el of cart){
                    const r2 = await this.orderProduct.create({
                        orderId: r1.id,
                        varId: el.varId,
                        count: el.count,
                        productId: el.productId
                    })
                }
                const r4 = await this.orderUser.create({
                    orderId: r1.id,
                    firstName: order.firstName,
                    secondName: order.secondName,
                    phone: Number(order.phone),
                    email: order.email
                })
                await this.cart.destroy({where:{userId: token.id}})
                return true
                
            }
            if(deliv==true){
                if( !order.country ||
                    !order.region ||
                    !order.city ||
                    !order.street ||
                    !order.home ||
                    !order.flat){
                        throw new HttpException("Заполните поля доставки", HttpStatus.BAD_REQUEST)
                    }
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: true,
                    payment: order.payment,
                    userId: token.id,
                    couponId: coupon
                })
                for( const el of cart){
                    const r2 = await this.orderProduct.create({
                        orderId: r1.id,
                        varId: el.varId,
                        count: el.count,
                        productId: el.productId
                    })
                }
                const r3 = await this.addresOrder.create({
                    country: order.country,
                    region: order.region,
                    city: order.city,
                    street: order.street,
                    home: order.home,
                    flat: order.flat,
                    orderId: r1.id
                })
                const r4 = await this.orderUser.create({
                    orderId: r1.id,
                    firstName: order.firstName,
                    secondName: order.secondName,
                    phone: Number(order.phone),
                    email: order.email
                })
                await this.cart.destroy({where:{userId: token.id}})
                return true
                
            }
            if(deliv==false){
                if(!order.city ||
                    !order.otd 
                 ){
                        throw new HttpException("Заполните поля доставки", HttpStatus.BAD_REQUEST)
                    }
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: true,
                    payment: order.payment,
                    userId: token.id,
                    couponId: coupon
                })
                for( const el of cart){
                    const r2 = await this.orderProduct.create({
                        orderId: r1.id,
                        varId: el.varId,
                        count: el.count,
                        productId: el.productId
                    })
                }
                const r3 = await this.addresOrder.create({
                    city: order.city,
                    home: order.otd,
                })
                const r4 = await this.orderUser.create({
                    orderId: r1.id,
                    firstName: order.firstName,
                    secondName: order.secondName,
                    phone: Number(order.phone),
                    email: order.email
                })
                await this.cart.destroy({where:{userId: token.id}})
                return true
                
            }

        } catch (error) {
          throw error;  
        }
    }

    async getOrders(page: number, limit: number = 6, vars: number){
        try {
            if(vars==0){
                const res = await this.orders.findAll({
                    limit,
                    offset: page* limit,
                    where:{
                        orderStatus: 'new'
                    },
                    order:[['id','desc']]
                })
                return res;
            }
            if(vars==1){
                const res = await this.orders.findAll({
                    limit,
                    offset: page* limit,
                    where:{
                        orderStatus: 'process'
                    },
                    order:[['id','desc']]
                })
                return res;
            }
            if(vars==2){
                const res = await this.orders.findAll({
                    limit,
                    offset: page* limit,
                    where:{
                        orderStatus: 'closed'
                    },
                    order:[['id','desc']]
                })
                return res;
            }
            const res = await this.orders.findAll({
                limit,
                offset: page* limit,
                order:[['id','desc']]
            })
            return res;
           
            
        } catch (error) {
            throw error;
        }

    }

    async getCountPages(limit: number){
        try {
            const res = await this.orders.count()
            return Math.floor(res/limit)+1;
        } catch (error) {
            throw error;
        }
    }

    async updateStatus(id: number, orderStatus: number){
        try {
            if(orderStatus==0){
                const res = await this.orders.update({orderStatus: "new"},{
                    where: {
                        id
                    }
                })
                return true
            }
            if(orderStatus==1){
                const res = await this.orders.update({orderStatus: "process"},{
                    where: {
                        id
                    }
                })
                return true
            }
            if(orderStatus==2){
                const res = await this.orders.update({orderStatus: "closed"},{
                    where: {
                        id
                    }
                })
                return true
            }
            return false
        } catch (error) {
            throw error;
        }
    }

    async getOrder(id: number){
        try {
            const order = await this.orders.findOne({where: {id}})
            const user = await this.orderUser.findOne({where: {orderId: order.id}})
            const addres= await this.addresOrder.findOne({where: {orderId: order.id}})
            const coupon= await this.couponRepository.findOne({
                include:{
                    model: Order,
                    where: {
                        id
                    }
                }
            })
            const products= await this.orders.findOne({
                where: {id},
                attributes: [],
                include:{
                    model: Product
                }})
            let sum =0;
            products['products'].map(v=>{
                sum+=(v.sale_price==0?v.price:v.sale_price)*v['OrderProduct']['count']
            })
            return {order, user, addres, products,sum, coupon}
        } catch (error) {
            throw error;
        }

    }

    async deleteOrders(ids: number[]){
        try {
            await this.orders.destroy({where: {id:ids}})
            await this.orderUser.destroy({where: {orderId: ids}})
            await this.addresOrder.destroy({where: {orderId: ids}})
            await this.orderProduct.destroy({where:{orderId:ids}})
            return true
        } catch (error) {
            throw error;
        }
    }

}
