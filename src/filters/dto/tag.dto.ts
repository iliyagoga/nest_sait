import { IsEmpty, IsString } from "class-validator";


export class TagDto{
    @IsEmpty({message:"Значение не должно быть пустым"})
    readonly  tagTitle: string
}