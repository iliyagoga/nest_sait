import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class RenameGroupDto{

    @ApiProperty({example: 'Летняя одежда', description: 'Назваиние группы категорий'})
    @IsString({message:"Значение должно быть строкой"})
    readonly groupTitle: string;

    @ApiProperty({example: '2', description: 'id группы категорий'})
    @IsNumber({},{message:"Значение должно быть строкой"})
    readonly id: number;
}