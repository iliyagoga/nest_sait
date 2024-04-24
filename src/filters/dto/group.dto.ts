import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";


export class GroupDto{
    @ApiProperty({example: 'Летняя одежда', description: 'Назваиние группы категорий'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly groupTitle: string
}