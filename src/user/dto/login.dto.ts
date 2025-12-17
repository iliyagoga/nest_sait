import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class LoginDto{

    @ApiProperty({example:'nick', description: 'Никнейм'})
    @IsString({message:"Поле должно быть строкой"})
    readonly nickname: string;

    @ApiProperty({example:'123', description: 'Пароль'})
    @IsString({message:"Поле должно быть строкой"})
    readonly password: string;
}