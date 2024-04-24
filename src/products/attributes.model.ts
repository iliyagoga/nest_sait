import { DataTypes } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { AttributeValue } from "./AttributeValuea.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName:"Attributes"})

export class Attribute extends Model<Attribute>{
    @ApiProperty({example: '1', description: 'id атрибута'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Состав', description: 'Название атрибута'})
    @Column ({ type: DataTypes.TEXT, allowNull: false, unique:true})
    attributeName: string;

    @HasMany(()=>AttributeValue)
    attributeValue: AttributeValue[]
}