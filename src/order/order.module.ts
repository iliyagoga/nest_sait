import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { AddresOrder } from './addresOrder.model';
import { OrderProduct } from './orderProduct.model';
import { Coupon } from 'src/coupon/coupon.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Variations } from 'src/products/variations.model';
import { JwtService } from '@nestjs/jwt';
import { Cart } from 'src/cart/cart.model';
import { CartService } from 'src/cart/cart.service';
import { Product } from 'src/products/product.model';
import { Attribute } from 'src/products/attributes.model';
import { OrderUser } from './orderUser.model';
import { User } from 'src/user/user.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Order, AddresOrder, OrderProduct, OrderUser, Coupon, Variations, Cart, Product, Attribute, User])
    ],
    controllers: [OrderController],
    providers: [OrderService,JwtService, CartService]
})
export class OrderModule {
    
}
