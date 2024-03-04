import { IsString } from "class-validator";


export class LoginDto{
    @IsString({message:"Поле должно быть строкой"})
    readonly nickname: string;

    @IsString({message:"Поле должно быть строкой"})

    readonly password: string;
}