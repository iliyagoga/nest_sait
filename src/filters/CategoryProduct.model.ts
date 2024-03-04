import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/product.model";
import { Category } from "./category.model";

@Table({tableName:"CategoryProduct"})

export class CategoryProduct extends Model<CategoryProduct>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;

    @ForeignKey(()=>Category)
    @Column({type: DataTypes.INTEGER})
    categoryId: number;

}