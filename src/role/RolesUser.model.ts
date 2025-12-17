
import { Column, DataType, Table,Model, ForeignKey } from "sequelize-typescript";
import { Role } from "./role.model";
import { User } from "src/user/user.model";
import { ApiProperty } from "@nestjs/swagger";

@Table({tableName: "RolesUser",createdAt:false, updatedAt:false})
export class RolesUser extends Model<RolesUser>{
    @ApiProperty({example:'1', description: 'id таблицы'})
    @Column({type: DataType.INTEGER, unique:true,autoIncrement:true,primaryKey:true})
    id: number

    @ApiProperty({example:'1', description: 'id роли'})
    @ForeignKey(()=>Role)
    @Column({type: DataType.NUMBER})
    roleId: number

    @ApiProperty({example:'1', description: 'id юзера'})
    @ForeignKey(()=>User)
    @Column({type: DataType.NUMBER})
    userId: number
}