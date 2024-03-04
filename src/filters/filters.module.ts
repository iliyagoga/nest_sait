import { Module } from '@nestjs/common';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';
import { Tag } from './tag.model';
import { Group } from './group.model';
import { Category } from './category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryProduct } from './CategoryProduct.model';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';



@Module({
  controllers: [FiltersController],
  imports: [SequelizeModule.forFeature([Tag, Group, Category,CategoryProduct, User])],
  providers: [FiltersService, JwtService],
})
export class FiltersModule {
}
