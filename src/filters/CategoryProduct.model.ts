import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/product.model";
import { Category } from "./category.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName:"CategoryProduct"})

export class CategoryProduct extends Model<CategoryProduct>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'id товара'})
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;

    @ApiProperty({example: '1', description: 'id категории'})
    @ForeignKey(()=>Category)
    @Column({type: DataTypes.INTEGER})
    categoryId: number;

}