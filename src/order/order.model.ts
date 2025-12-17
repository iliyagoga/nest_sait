import { DataTypes } from "sequelize";
import { BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { AddresOrder } from "./addresOrder.model";
import { OrderProduct } from "./orderProduct.model";
import { Coupon } from "src/coupon/coupon.model";
import { OrderUser } from "./orderUser.model";
import { Product } from "src/products/product.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:"Orders"})
export class Order extends Model<Order>{
    @ApiProperty({example: '1', description: 'id заказа'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'open/process/closed', description: 'Статус заказа'})
    @Column({type: DataTypes.TEXT, allowNull: false})
    orderStatus: string;

    @ApiProperty({example: 'Комментарий', description: 'Комментарий'})
    @Column({type: DataTypes.TEXT})
    comment: string;

    @ApiProperty({example: 'true/false/null', description: 'Вид доставки'})
    @Column({type: DataTypes.BOOLEAN})
    deliv: boolean;

    @ApiProperty({example: 'true/false/null', description: 'Вид оплаты'})
    @Column({type: DataTypes.BOOLEAN})
    payment: boolean;

    @ApiProperty({example: '1', description: 'id таблицу Users'})
    @ForeignKey(()=>User)
    @Column({type:DataTypes.INTEGER})
    userId: number;

    @ApiProperty({example: '2', description: 'id купона'})
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
