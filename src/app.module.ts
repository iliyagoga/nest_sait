import { Module } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { FiltersModule } from './filters/filters.module';
import { ProductsModule } from './products/products.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './filters/category.model';
import { Colors } from './filters/color.model';
import { Group } from './filters/group.model';
import { Tag } from './filters/tag.model';
import { Attribute } from './products/attributes.model';
import { AttributeValue } from './products/AttributeValuea.model';
import { Product } from './products/product.model';
import { Role } from './role/role.model';
import { RolesUser } from './role/RolesUser.model';
import { User } from './user/user.model';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { Cart } from './cart/cart.model';
import { Coupon } from './coupon/coupon.model';
import { CategoryProduct } from './filters/CategoryProduct.model';
import { TagProduct } from './filters/TagProduct.model';
import { AddresOrder } from './order/addresOrder.model';
import { Order } from './order/order.model';
import { OrderProduct } from './order/orderProduct.model';
import { AttributeProduct } from './products/AttributeProduct.model';
import { UserModule } from './user/user.module';
import { CouponService } from './coupon/coupon.service';
import { CouponModule } from './coupon/coupon.module';
import { FilesModule } from './files/files.module';
import { Previews } from './products/preview.model';
import { Gallery } from './products/gallery.model';
import * as path from 'path'
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host:'localhost',
      port: 5433,
      username: 'postgres',
      password: 'admin',
      database: 'Shop',
      models: [Cart,Coupon,Category, CategoryProduct, Colors, Group, Tag, TagProduct, AddresOrder, Order,OrderProduct, Attribute, AttributeValue, AttributeProduct,
      Product, Role, RolesUser, User, Previews, Gallery],
      autoLoadModels:true
    }),
    RoleModule, FiltersModule, ProductsModule, CartModule, OrderModule, UserModule, CouponModule, FilesModule,
    
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname,'..', 'static')})]

})
export class AppModule {}
