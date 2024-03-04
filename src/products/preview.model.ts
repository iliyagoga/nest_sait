import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";


@Table({tableName:'Previews'})
export class Previews extends Model<Previews>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column ({ type: DataTypes.TEXT, allowNull: false})
    title: string;

    @ForeignKey(()=>Product)

    productId: number;

}