import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateRoleDto{
    @ApiProperty({example: 'ADMIN', description: 'Роль'})
    @IsNotEmpty({message:"Не может быть пустым"})
    @IsString({message:"Должно быть строкой"})
    readonly role: string;

}