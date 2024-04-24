import { DataTypes } from "sequelize";
import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "./group.model";
import { Product } from "src/products/product.model";
import { CategoryProduct } from "./CategoryProduct.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName:"Categories"})
export class Category extends Model<Category>{

    @ApiProperty({example: '1', description: 'id категории'})
    @Column({type: DataTypes.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number;

    @ApiProperty({example: 'Футболки', description: 'Наименование категории'})
    @Column({type: DataTypes.TEXT})
    categoryName: string;

    @ApiProperty({example: '2', description: 'id группы категорий'})
    @ForeignKey(()=>Group)
    @Column({type: DataTypes.INTEGER})
    groupId: number;

    @BelongsTo(()=>Group)
    group: Group;

    @BelongsToMany(()=>Product,()=>CategoryProduct)
    product: Product[]
}