import { DataTypes } from "sequelize";
import { BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Attribute } from "./attributes.model";
import { Product } from "./product.model";
import { AttributeProduct } from "./AttributeProduct.model";
import { Variations } from "./variations.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:"AtrributeValue"})

export class AttributeValue extends Model<AttributeValue>{
    @ApiProperty({example: '1', description: 'id значения атрибута'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Шерсть', description: 'Наименование значения атрибута'})
    @Column ({ type: DataTypes.TEXT, allowNull: false})
    attributeValue: string;

    @ApiProperty({example: '1', description: 'id атрибута'})
    @ForeignKey(()=>Attribute)
    @Column({type: DataTypes.INTEGER})
    attributeId: number;

    @BelongsToMany(()=>Product,()=>AttributeProduct)
    product: Product[];

    @HasMany(()=>Variations)
    variations: Variations[];
}