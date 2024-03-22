import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/product.model";
import { Variations } from "src/products/variations.model";
import { User } from "src/user/user.model";

@Table({tableName:"Carts"})
export class Cart extends Model<Cart>{
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ForeignKey(()=>User)
    @Column({type:DataTypes.INTEGER})
    userId: number;

    @ForeignKey(()=>Product)
    @Column({type:DataTypes.INTEGER})
    productId: number;

    @ForeignKey(()=>Variations)
    @Column({type:DataTypes.INTEGER})
    varId: number;

    @Column({type: DataTypes.INTEGER,allowNull:false})
    count: number;
}