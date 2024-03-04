import { DataTypes } from "sequelize";
import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "./group.model";
import { Product } from "src/products/product.model";
import { CategoryProduct } from "./CategoryProduct.model";

@Table({tableName:"Categories"})
export class Category extends Model<Category>{

    @Column({type: DataTypes.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number;

    @Column({type: DataTypes.TEXT})

    categoryName: string;

    @ForeignKey(()=>Group)
    @Column({type: DataTypes.INTEGER})

    groupId: number;

    @BelongsTo(()=>Group)
    group: Group;

    @BelongsToMany(()=>Product,()=>CategoryProduct)
    product: Product[]
}