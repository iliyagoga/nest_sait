import { DataTypes } from "sequelize";
import { Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { AddresOrder } from "./addresOrder.model";
import { OrderProduct } from "./orderProduct.model";


@Table({tableName:"Orders"})
export class Order extends Model<Order>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataTypes.TEXT, allowNull: false})

    orderStatus: string;

    @Column({type: DataTypes.TEXT})
    comment: string;

    @ForeignKey(()=>User)
    @Column({type:DataTypes.INTEGER})
    userId: number;

    @HasMany(()=>AddresOrder)
    addresOrder: AddresOrder[];

    
    @HasMany(()=>OrderProduct)
    orderProduct: OrderProduct[]




}
