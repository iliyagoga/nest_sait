import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";


export class CategoryDto{
    @ApiProperty({example: 'Футболки', description: 'Наименование категории'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly categoryName: string

    @ApiProperty({example: '1', description: 'id группы категорий'})
    @IsNumber({},{message:"Значение должно быть числом"})
    @IsEmpty({message:"Значение не должно быть пустым"})
    readonly groupId: number
    
}