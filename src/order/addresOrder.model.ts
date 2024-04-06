import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.model";

@Table({tableName:"AddresOrders"})
export class AddresOrder extends Model<AddresOrder>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataTypes.TEXT})

    country: string;

    @Column({type: DataTypes.TEXT})

    region: string;

    @Column({type: DataTypes.TEXT})

    city: string;

    @Column({type: DataTypes.TEXT})

    street: string;

    @Column({type: DataTypes.TEXT})

    home: string;

    @Column({type: DataTypes.TEXT})

    flat: string;
    

    @ForeignKey(()=>Order)
    @Column({type:DataTypes.INTEGER})

    orderId: number;

}