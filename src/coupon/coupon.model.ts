import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/order.model";


@Table({tableName:"Coupons"})
export class Coupon extends Model<Coupon>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataTypes.TEXT,allowNull:false, unique:true})
    couponTitle: string;

    @Column({type:DataTypes.TEXT,allowNull:false, unique:true})
    couponValue: string;

    @Column({type:DataTypes.INTEGER,allowNull:false})
    couponTimelife: number;

    @HasMany(()=>Order)
    Order: Order[]
}