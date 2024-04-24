import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Order } from "./order.model";
import { Product } from "src/products/product.model";
import { Variations } from "src/products/variations.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName: "OrderUsers"})
export class OrderUser extends Model<OrderUser>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ttt@ttt.tt', description: 'Почта'})
    @Column({type: DataTypes.TEXT,  allowNull: false})
    email:string;

    
    @ApiProperty({example: '111111', description: 'Номер телефона'})
    @Column({type: DataTypes.INTEGER,  allowNull: false})
    phone: number;

    @ApiProperty({example: 'Имя', description: 'Имя'})
    @Column ({ type: DataTypes.TEXT, allowNull: false})
    firstName: string;

    @ApiProperty({example: 'Фамилия', description: 'Фамилия'})
    @Column ({ type: DataTypes.TEXT, allowNull: false})
    secondName: string;

    @ApiProperty({example: '1', description: 'id заказа'})
    @ForeignKey(()=>Order)
    @Column({type:DataTypes.INTEGER})
    orderId: number;
}

