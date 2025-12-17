import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Product } from "src/products/product.model";
import { Variations } from "src/products/variations.model";
import { User } from "src/user/user.model";

@Table({tableName:"Carts"})
export class Cart extends Model<Cart>{
    @ApiProperty({example:1,description:'Первичный ключ'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:5,description:'Внешний ключ к таблице Users'})
    @ForeignKey(()=>User)
    @Column({type:DataTypes.INTEGER})
    userId: number;

    @ApiProperty({example:5,description:'Внешний ключ к таблице Products'})
    @ForeignKey(()=>Product)
    @Column({type:DataTypes.INTEGER})
    productId: number;

    @ApiProperty({example:5,description:'Внешний ключ к таблице Variations'})
    @ForeignKey(()=>Variations)
    @Column({type:DataTypes.INTEGER})
    varId: number;

    @ApiProperty({example:10,description:'Количество данного продукта'})
    @Column({type: DataTypes.INTEGER,allowNull:false})
    count: number;
}