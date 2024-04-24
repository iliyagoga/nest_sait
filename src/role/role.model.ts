import { DataTypes } from "sequelize";
import { BelongsToMany, Column, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { RolesUser } from "./RolesUser.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName:"Roles"})
export class Role extends Model<Role> {

    @ApiProperty({example:'1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example:'ADMIN', description: 'Роль'})
    @Column({type:DataTypes.TEXT,unique:true,allowNull:false})
    role: string;

    @BelongsToMany(()=>User, ()=>RolesUser)
    user: User[]
}