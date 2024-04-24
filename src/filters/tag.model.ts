import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/product.model";
import { TagProduct } from "./TagProduct.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName: "Tags"})

export class Tag extends Model<Tag>{
    @ApiProperty({example: '1', description: 'id тега'})
    @Column({type: DataTypes.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number;

    @ApiProperty({example: 'ТОП1', description: 'Наименование тега'})
    @Column({type: DataTypes.TEXT, unique:true})
    tagTitle: string;

    @BelongsToMany(()=>Product,()=>TagProduct)
    product: Product[]
}