import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "src/products/product.model";
import { Variations } from "src/products/variations.model";

@Table({tableName: "OrderProducts"})
export class OrderProduct extends Model<OrderProduct>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Variations)
    @Column({type:DataTypes.INTEGER})
    varId: number;

    @Column({type: DataTypes.INTEGER,allowNull:false})
    count: number;
    
    @ForeignKey(()=>Order)
    @Column({type:DataTypes.INTEGER})

    orderId: number;

    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})

    productId: number;

}
