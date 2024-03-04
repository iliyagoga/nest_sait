import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cart } from './cart.model';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/product.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CartController],
  providers: [CartService, JwtService],
  imports:[
    SequelizeModule.forFeature([Cart, Product]),
   
  ],

})
export class CartModule {}
