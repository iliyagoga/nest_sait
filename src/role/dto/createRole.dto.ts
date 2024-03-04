import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateRoleDto{
    @IsNotEmpty({message:"Не может быть пустым"})
    @IsString({message:"Должно быть строкой"})
    readonly role: string;

}