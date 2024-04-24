import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Length, MinLength } from "class-validator";

export class OrderDto{
    @ApiProperty({example: 'Имя', description: 'Имя'})
    @MinLength(1,{message:"Поле не должно быть пустым"})
    readonly firstName: string;

    @ApiProperty({example: 'Фамилия', description: 'Фамилия'})
    @MinLength(1,{message:"Поле не должно быть пустым"})
    readonly secondName: string;

    @ApiProperty({example: 'ttt@ttt.tt', description: 'Почта'})
    @MinLength(1,{message:"Поле не должно быть пустым"})
    readonly email: string;

    @ApiProperty({example: '111111', description: 'Номер телефона'})
    @MinLength(1,{message:"Поле не должно быть пустым"})
    readonly phone: string;

    @ApiProperty({example: 'Комментарий', description: 'Комментарий'})
    readonly comment: string;

    @ApiProperty({example: 'true/false/null', description: 'Вид доставки'})
    readonly deliv: boolean;

    @ApiProperty({example: 'true/false/null', description: 'Вид оплаты'})
    readonly payment: boolean;

    @ApiProperty({example: 'Страна', description: 'Страна'})
    readonly country: string;

    @ApiProperty({example: 'Регион', description: 'Область, округ, штат'})
    readonly region: string;

    @ApiProperty({example: 'Город', description: 'Город'})
    readonly city: string;

    @ApiProperty({example: 'Улица', description: 'Улица'})
    readonly street: string;

    @ApiProperty({example: '8', description: 'Номер дома'})
    readonly home: string;

    @ApiProperty({example: '11', description: 'Номер квартиры'})
    readonly flat: string;

    @ApiProperty({example: 'Отдел почты', description: 'Отдел почты'})
    readonly otd: string;

    @ApiProperty({example: '2', description: 'id купона'})
    readonly couponId: number;
    
}