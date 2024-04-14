import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/product.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Variations } from 'src/products/variations.model';
import { Attribute } from 'src/products/attributes.model';
import { Coupon } from 'src/coupon/coupon.model';

@Module({
  controllers: [CartController],
  providers: [CartService, JwtService],
  imports:[
    SequelizeModule.forFeature([Cart, Product, Variations, Attribute, Coupon]),
    JwtModule
   
  ],
  exports: [CartModule]

})
export class CartModule {}
