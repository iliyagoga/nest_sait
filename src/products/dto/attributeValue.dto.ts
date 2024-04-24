import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class AttributeValueDto{
    @ApiProperty({example: 'Шерсть', description: 'Наименование значения атрибута'})
    @IsString({message:"Значение должно быть строкой"})
    readonly attributeValue: string;

    @ApiProperty({example: '1', description: 'id атрибута'})
    @IsNumber({},{message:"Значение должно быть числом"})
    readonly attributeId: number;
}
