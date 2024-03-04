import { DataTypes } from "sequelize";
import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "./category.model";


@Table({tableName:"Groups"})

export class Group extends Model<Group>{
    @Column({type: DataTypes.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number;

    @Column({type: DataTypes.TEXT})

    groupTitle: string;

    @HasMany(()=>Category)
    category: Category[];
}