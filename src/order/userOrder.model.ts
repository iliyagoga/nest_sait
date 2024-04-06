import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "src/products/product.model";
import { Variations } from "src/products/variations.model";

@Table({tableName: "OrderUsers"})
export class OrderUser extends Model<OrderUser>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataTypes.TEXT,  allowNull: false})
    email:string;

    @Column({type: DataTypes.INTEGER,  allowNull: false})
    phone: number;

    @Column ({ type: DataTypes.TEXT, allowNull: false})
    firstName: string;

    @Column ({ type: DataTypes.TEXT, allowNull: false})
    secondName: string;

    @ForeignKey(()=>Order)
    @Column({type:DataTypes.INTEGER})
    orderId: number;
}

