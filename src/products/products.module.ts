import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Attribute } from './attributes.model';
import { Product } from './product.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AttributeValue } from './AttributeValuea.model';
import { FiltersModule } from 'src/filters/filters.module';
import { AttributeProduct } from './AttributeProduct.model';
import { CategoryProduct } from 'src/filters/CategoryProduct.model';
import { TagProduct } from 'src/filters/TagProduct.model';
import { Cart } from 'src/cart/cart.model';
import { JwtService } from '@nestjs/jwt';
import { FilesService } from 'src/files/files.service';
import { Previews } from './preview.model';
import { Gallery } from './gallery.model';
import { Tag } from 'src/filters/tag.model';
import { Category } from 'src/filters/category.model';
import { Group } from 'src/filters/group.model';
import { Variations } from './variations.model';
import { RecommendationProducts } from './recommendationProduct.model';
import { User } from 'src/user/user.model';

@Module({
  imports:[SequelizeModule.forFeature([Attribute,Product,AttributeValue,AttributeProduct,CategoryProduct,TagProduct,Cart,Previews, Gallery, Tag, Category, Group, Variations, RecommendationProducts, User]),FiltersModule],
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, FilesService],
  exports:[ProductsModule]

})
export class ProductsModule {}
