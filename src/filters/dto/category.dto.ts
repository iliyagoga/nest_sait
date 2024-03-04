import { IsEmpty, IsNumber, IsString } from "class-validator";


export class CategoryDto{
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly categoryName: string

    @IsNumber({},{message:"Значение должно быть числом"})
    @IsEmpty({message:"Значение не должно быть пустым"})
    readonly groupId: number
    
}