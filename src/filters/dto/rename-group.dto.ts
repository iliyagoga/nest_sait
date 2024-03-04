import { IsNumber, IsString } from "class-validator";


export class RenameGroupDto{


    @IsString({message:"Значение должно быть строкой"})
    readonly groupTitle: string;
    
    @IsNumber({},{message:"Значение должно быть строкой"})
    readonly id: number;
}