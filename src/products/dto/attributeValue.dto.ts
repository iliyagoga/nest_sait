import { IsNumber, IsString } from "class-validator";


export class AttributeValueDto{

    @IsString({message:"Значение должно быть строкой"})
    readonly attributeValue: string;
    @IsNumber({},{message:"Значение должно быть числом"})
    readonly attributeId: number;
}
