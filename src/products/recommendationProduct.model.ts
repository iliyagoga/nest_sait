import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "./product.model";

@Table({tableName:"RecommendationProducts"})
export class RecommendationProducts extends Model<RecommendationProducts>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(()=>Product)
    @Column({type: DataTypes.INTEGER, allowNull: false})
    productId: number;
}