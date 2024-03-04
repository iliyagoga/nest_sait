import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Attribute } from "./attributes.model";
import { AttributeValue } from "./AttributeValuea.model";
import { Product } from "./product.model";


@Table({tableName:"AttributeProduct"})
export class AttributeProduct extends Model<AttributeProduct>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;

    
    @ForeignKey(()=>AttributeValue)
    @Column({type: DataTypes.INTEGER})
    attributeValueId: number;

    


}