import { DataTypes } from "sequelize";
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { AttributeValue } from "./AttributeValuea.model";
import { Cart } from "src/cart/cart.model";


@Table({tableName:'Variations'})
export class Variations extends Model<Variations>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    productId: number;

    @ForeignKey(()=>AttributeValue)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    attributeValueId: number;

    @HasMany(()=>Cart)
    orders: Cart[]

    
}