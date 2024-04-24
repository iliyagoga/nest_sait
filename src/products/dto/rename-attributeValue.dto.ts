import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class RenameAttributeValue{
    @ApiProperty({example: 'Шерсть', description: 'Значение атрибута'})
    @IsString({message:"Должно быть строкой"})
    readonly attributeValue: string

    @ApiProperty({example: '1', description: 'id значения атрибута'})
    @IsNumber({},{message:"Должно быть числом"})
    readonly attributeValueId:  number;
}