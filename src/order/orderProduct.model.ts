import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "src/products/product.model";
import { Variations } from "src/products/variations.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName: "OrderProducts"})
export class OrderProduct extends Model<OrderProduct>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'id вариации'})
    @ForeignKey(()=>Variations)
    @Column({type:DataTypes.INTEGER})
    varId: number;

    @ApiProperty({example: '10', description: 'Количество товара'})
    @Column({type: DataTypes.INTEGER,allowNull:false})
    count: number;
    
    @ApiProperty({example: '1', description: 'id заказа'})
    @ForeignKey(()=>Order)
    @Column({type:DataTypes.INTEGER})
    orderId: number;

    @ApiProperty({example: '1', description: 'id товара'})
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;

}
