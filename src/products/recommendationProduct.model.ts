import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({tableName:"RecommendationProducts"})
export class RecommendationProducts extends Model<RecommendationProducts>{
    @Column({type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    productId: number;

    @Column({type: DataTypes.INTEGER, allowNull: false})
    productRecId: number;
}