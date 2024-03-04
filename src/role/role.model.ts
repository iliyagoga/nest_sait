import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { RolesUser } from "./RolesUser.model";

@Table({tableName:"Roles"})
export class Role extends Model<Role> {


    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type:DataTypes.TEXT,unique:true,allowNull:false})

    role: string;

    @BelongsToMany(()=>User, ()=>RolesUser)
    user: User[]
}