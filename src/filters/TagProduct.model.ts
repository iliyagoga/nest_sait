import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Tag } from "./tag.model";
import { Product } from "src/products/product.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:"TagProduct"})
export class TagProduct extends Model<TagProduct>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: '1', description: 'id тега'})
    @ForeignKey(()=>Tag)
    @Column({type: DataTypes.INTEGER})
    tagId: number;
    
    @ApiProperty({example: '1', description: 'id тпродукта'})
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER})
    productId: number;
}