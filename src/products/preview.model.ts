import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:'Previews'})
export class Previews extends Model<Previews>{

    @ApiProperty({example: '1', description: 'id изображения'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'img.png', description: 'Название изображения'})
    @Column ({ type: DataTypes.TEXT, allowNull: false})
    title: string;

    @ApiProperty({example: '1', description: 'id продукта'})
    @ForeignKey(()=>Product)
    productId: number;

}