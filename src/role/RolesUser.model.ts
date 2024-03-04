
import { Column, DataType, Table,Model, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.model";
import { User } from "src/user/user.model";

@Table({tableName: "RolesUser",createdAt:false, updatedAt:false})
export class RolesUser extends Model<RolesUser>{
    @Column({type: DataType.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number
    @ForeignKey(()=>Role)
    @Column({type: DataType.NUMBER})
    roleId: number

    @ForeignKey(()=>User)
    @Column({type: DataType.NUMBER})
    userId: number
}