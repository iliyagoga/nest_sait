
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto{

    @IsString({message:"Поле должно быть строкой"})
    readonly nickname: string;

    @IsString({message:"Поле должно быть строкой"})
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string

    @IsString({message:"Поле должно быть строкой"})
    @Length(6,20,{message:"Пароль должен быть от 6 до 20 символов"})
    readonly password: string

}