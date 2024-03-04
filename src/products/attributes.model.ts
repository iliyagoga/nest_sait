import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { AttributeValue } from "./AttributeValuea.model";


@Table({tableName:"Attributes"})

export class Attribute extends Model<Attribute>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column ({ type: DataTypes.TEXT, allowNull: false, unique:true})

    attributeName: string;

    @HasMany(()=>AttributeValue)

    attributeValue: AttributeValue[]
}