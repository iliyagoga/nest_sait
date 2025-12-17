import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName:"RecommendationProducts"})
export class RecommendationProducts extends Model<RecommendationProducts>{
    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @ApiProperty({example: '1', description: 'id товара'})
    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    productId: number;

    @ApiProperty({example: '1', description: 'id рекомедованного товара'})
    @Column({type: DataTypes.INTEGER, allowNull: false})
    productRecId: number;
}