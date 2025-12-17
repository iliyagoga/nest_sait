import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Attribute } from "./attributes.model";
import { AttributeValue } from "./AttributeValuea.model";
import { Product } from "./product.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:"AttributeProduct"})
export class AttributeProduct extends Model<AttributeProduct>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'id продукта'})
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;

    @ApiProperty({example: '1', description: 'id значения атрибута'})
    @ForeignKey(()=>AttributeValue)
    @Column({type: DataTypes.INTEGER})
    attributeValueId: number;

    


}