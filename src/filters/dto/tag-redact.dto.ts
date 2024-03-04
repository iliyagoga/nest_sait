import { IsEmpty, IsNumber, IsString } from "class-validator";


export class TagRedact{
    @IsEmpty({message:"Значение не должно быть пустым"})
    readonly tagTitle: string;
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsNumber({},{message:"Значнеие должно быть числом"})
    readonly id: number;
}