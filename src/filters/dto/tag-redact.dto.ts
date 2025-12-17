import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";


export class TagRedact{
    @ApiProperty({example: 'ТОП1', description: 'Наименование тега'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    readonly tagTitle: string;

    @ApiProperty({example: '1', description: 'id тега'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsNumber({},{message:"Значение должно быть числом"})
    readonly id: number;
}