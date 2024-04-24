import { DataTypes } from "sequelize";
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { AttributeValue } from "./AttributeValuea.model";
import { Cart } from "src/cart/cart.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:'Variations'})
export class Variations extends Model<Variations>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    
    @ApiProperty({example: '1', description: 'id товара'})
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    productId: number;

    
    @ApiProperty({example: '1', description: 'id значения атрибута'})
    @ForeignKey(()=>AttributeValue)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    attributeValueId: number;

    @HasMany(()=>Cart)
    orders: Cart[]

    
}