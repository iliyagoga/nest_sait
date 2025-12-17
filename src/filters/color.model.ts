import { DataTypes } from "sequelize";
import { Column, Model, Table } from "sequelize-typescript";

//пробная таблица, не влючающаяся в работу
@Table({tableName:"Colors"})

export class Colors extends Model<Colors>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column ({ type: DataTypes.TEXT, allowNull: false, unique: true})

    title: string;

    @Column ({ type: DataTypes.TEXT, allowNull: false, unique: true})

    value: string;
}