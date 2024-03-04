import { IsNumber, IsString } from "class-validator";

export class RenameCategoryDto{

    @IsString({message:"Значение должно быть строкой"})
    readonly categoryName: string;

    @IsNumber({},{message:"Значение должно быть числом"})
    readonly id: number;


}