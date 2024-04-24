import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Order } from "src/order/order.model";


@Table({tableName:"Coupons"})
export class Coupon extends Model<Coupon>{

    @ApiProperty({example: '1', description: 'id купона'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'весна2024', description: 'Название купона'})
    @Column({type:DataTypes.TEXT,allowNull:false, unique:true})
    couponTitle: string;

    @ApiProperty({example: '2000', description: 'Скидка купона'})
    @Column({type:DataTypes.TEXT,allowNull:false, unique:true})
    couponValue: string;

    @ApiProperty({example: '2024-04-13 00:46:13.636+04', description: 'Время жизни купона'})
    @Column({type:DataTypes.BIGINT,allowNull:false})
    couponTimelife: number;

    @HasMany(()=>Order)
    Order: Order[]
}