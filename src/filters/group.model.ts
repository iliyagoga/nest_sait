import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:"Groups"})

export class Group extends Model<Group>{
    @ApiProperty({example: '1', description: 'id группы'})
    @Column({type: DataTypes.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number;

    @ApiProperty({example: 'Летняя одежда', description: 'Наименование группы'})
    @Column({type: DataTypes.TEXT})
    groupTitle: string;

    @HasMany(()=>Category)
    category: Category[];
}