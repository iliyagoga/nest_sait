import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tag } from "./tag.model";
import { Product } from "src/products/product.model";


@Table({tableName:"TagProduct"})
export class TagProduct extends Model<TagProduct>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Tag)
    @Column({type: DataTypes.INTEGER})
    tagId: number;
    
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;
}