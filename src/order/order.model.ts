import { DataTypes } from "sequelize";
import { BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { AddresOrder } from "./addresOrder.model";
import { OrderProduct } from "./orderProduct.model";
import { Coupon } from "src/coupon/coupon.model";
import { OrderUser } from "./orderUser.model";
import { Product } from "src/products/product.model";


@Table({tableName:"Orders"})
export class Order extends Model<Order>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataTypes.TEXT, allowNull: false})

    orderStatus: string;

    @Column({type: DataTypes.TEXT})
    comment: string;

    @Column({type: DataTypes.BOOLEAN})
    deliv: boolean;

    @Column({type: DataTypes.BOOLEAN})
    payment: boolean;

    @ForeignKey(()=>User)
    @Column({type:DataTypes.INTEGER})
    userId: number;

    @ForeignKey(()=>Coupon)
    @Column({type:DataTypes.INTEGER})
    couponId: number;


    @HasMany(()=>AddresOrder)
    addresOrder: AddresOrder[];

    
    @HasMany(()=>OrderProduct)
    orderProduct: OrderProduct[]

    @HasMany(()=>OrderUser)
    orderUser: OrderUser[]

    @BelongsToMany(()=>Product, ()=>OrderProduct)
    products: Product[]




}
