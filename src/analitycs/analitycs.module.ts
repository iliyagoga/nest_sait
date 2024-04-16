import { Module } from '@nestjs/common';
import { AnalitycsController } from './analitycs.controller';
import { AnalitycsService } from './analitycs.service';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/order/order.model';
import { User } from 'src/user/user.model';
import { OrderProduct } from 'src/order/orderProduct.model';
import { Product } from 'src/products/product.model';
import { Category } from 'src/filters/category.model';
import { Coupon } from 'src/coupon/coupon.model';

@Module({
  controllers: [AnalitycsController],
  providers: [AnalitycsService, JwtService],
  imports:[SequelizeModule.forFeature([Order, User, OrderProduct, Product, Coupon])]
})
export class AnalitycsModule {}
