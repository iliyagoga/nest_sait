import { DataTypes } from "sequelize";
import { BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Attribute } from "./attributes.model";
import { Product } from "./product.model";
import { AttributeProduct } from "./AttributeProduct.model";
import { Variations } from "./variations.model";


@Table({tableName:"AtrributeValue"})

export class AttributeValue extends Model<AttributeValue>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column ({ type: DataTypes.TEXT, allowNull: false})

    attributeValue: string;


    @ForeignKey(()=>Attribute)
    @Column({type: DataTypes.INTEGER})
    attributeId: number;

    @BelongsToMany(()=>Product,()=>AttributeProduct)
    product: Product[];

    @HasMany(()=>Variations)
    variations: Variations[];
}