import { DataTypes } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "src/cart/cart.model";
import { Order } from "src/order/order.model";
import { Product } from "src/products/product.model";
import { RolesUser } from "src/role/RolesUser.model";
import { Role } from "src/role/role.model";

interface CreateUserAble{
    nickname: string;
    email: string;
    password: string;
}
@Table({tableName:'Users'})

export class User extends Model<User, CreateUserAble>{


    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataTypes.TEXT, unique: true, allowNull: false})

    email:string;

    @Column({type: DataTypes.TEXT, allowNull: false})

    nickname: string;

    @Column({type: DataTypes.TEXT, allowNull: false})

    password: string;

    @Column({type: DataTypes.INTEGER, unique: true})

    phone: number;

    @Column ({ type: DataTypes.TEXT})

    firstName: string;

    @Column ({ type: DataTypes.TEXT})
    secondName: string;

    @Column ({ type: DataTypes.TEXT})

    fatherName: string;

    @Column({ type: DataTypes.INTEGER})

    passportSeria: number;

    @Column({type: DataTypes.INTEGER, unique: true})

    passportNumber:number;

    @Column({type: DataTypes.TEXT})

    avatar: string;

    @Column({type: DataTypes.TEXT})

    country: string;

    @Column({type: DataTypes.TEXT})

    region: string;

    @Column({type: DataTypes.TEXT})

    city: string;

    @Column({type: DataTypes.TEXT})

    street: string;

    @Column({type: DataTypes.TEXT})

    home: string;

    @Column({type: DataTypes.TEXT})

    flat: string;

    @BelongsToMany(()=>Role, ()=>RolesUser)

    role: Role[];

    
    @BelongsToMany(()=>Product, ()=>Cart)

    product: Product[];

    @HasMany(()=>Order)

    order: Order[];


}
