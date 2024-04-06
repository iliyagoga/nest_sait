import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OrderDto } from './dto/Order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';;
import { AddresOrder } from './addresOrder.model';
import { OrderProduct } from './orderProduct.model';
import { Cart } from 'src/cart/cart.model';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { OrderUser } from './userOrder.model';

@Injectable()
export class OrderService {
    constructor(
        private jwt: JwtService,
        private cartService: CartService,
        @InjectModel(Order) private orders: typeof Order,
        @InjectModel(AddresOrder) private addresOrder: typeof AddresOrder,
        @InjectModel(OrderProduct) private orderProduct: typeof OrderProduct,
        @InjectModel(Cart) private cart: typeof Cart,
        @InjectModel(OrderUser) private orderUser: typeof OrderUser
    ){}

    async createOrder(auth: string, order: OrderDto){
       
        try {
            const token = this.jwt.decode(auth.split(' ')[1])
            const cart = await this.cart.findAll({
                where:{
                    userId: token.id
                }
            })
            const deliv = order.deliv;
            if(deliv==null){
                const r1 = await this.orders.create({
                    orderStatus: 'new',
                    comment: order.comment,
                    deliv: null,
                    payment: order.payment,
                    userId: token.id
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
                    userId: token.id
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
                    userId: token.id
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
}
