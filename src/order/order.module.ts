import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.model';
import { AddresOrder } from './addresOrder.model';
import { OrderProduct } from './orderProduct.model';
import { Coupon } from 'src/coupon/coupon.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Order, AddresOrder, OrderProduct, Coupon])
    ]
})
export class OrderModule {
    
}
