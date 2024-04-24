import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString} from "class-validator";


export class AttributeDto{
    @ApiProperty({example: 'Состав', description: 'Название атрибута'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly attributeName: string;
}