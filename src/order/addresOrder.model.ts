import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.model";

@Table({tableName:"AddresOrders"})
export class AddresOrder extends Model<AddresOrder>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataTypes.TEXT, allowNull:false})

    country: string;

    @Column({type: DataTypes.TEXT, allowNull:false})

    region: string;

    @Column({type: DataTypes.TEXT, allowNull:false})

    city: string;

    @Column({type: DataTypes.TEXT, allowNull:false})

    street: string;

    @Column({type: DataTypes.TEXT, allowNull:false})

    home: string;

    @Column({type: DataTypes.TEXT, allowNull:false})

    flat: string;

    @ForeignKey(()=>Order)
    @Column({type:DataTypes.INTEGER})

    orderId: number;

}