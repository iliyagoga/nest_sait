import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/product.model";
import { TagProduct } from "./TagProduct.model";


@Table({tableName: "Tags"})

export class Tag extends Model<Tag>{

    @Column({type: DataTypes.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number;

    @Column({type: DataTypes.TEXT, unique:true})

    tagTitle: string;

    @BelongsToMany(()=>Product,()=>TagProduct)
    product: Product[]
}