import { IsEmpty, IsString } from "class-validator";


export class GroupDto{
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly groupTitle: string
}