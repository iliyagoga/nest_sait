import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RenameCategoryDto{
    @ApiProperty({example: 'Футболки', description: 'Наименование категории'})
    @IsString({message:"Значение должно быть строкой"})
    readonly categoryName: string;

    @ApiProperty({example: '2', description: 'id категории'})
    @IsNumber({},{message:"Значение должно быть числом"})
    readonly id: number;


}