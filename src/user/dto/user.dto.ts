
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto{

    @ApiProperty({example:'nick', description: 'Никнейм'})
    @IsString({message:"Поле должно быть строкой"})
    readonly nickname: string;

    @ApiProperty({example:'tttt@ttt.tt', description: 'Почта'})
    @IsString({message:"Поле должно быть строкой"})
    @IsEmail({},{message: "Некорректный email"})
    readonly email: string

    @ApiProperty({example:'123', description: 'Пароль'})
    @IsString({message:"Поле должно быть строкой"})
    @Length(6,20,{message:"Пароль должен быть от 6 до 20 символов"})
    readonly password: string

}