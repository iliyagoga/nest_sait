import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";


export class TagDto{
    @ApiProperty({example: 'ТОП1', description: 'Наименование тега'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    readonly  tagTitle: string
}