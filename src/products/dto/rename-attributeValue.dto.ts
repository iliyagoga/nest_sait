import { IsNumber, IsString } from "class-validator";


export class RenameAttributeValue{
    @IsString({message:"Должно быть строкой"})
    readonly attributeValue: string

    @IsNumber({},{message:"Должно быть числом"})
    readonly attributeValueId:  number;
}