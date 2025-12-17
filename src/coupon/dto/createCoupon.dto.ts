import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsString } from "class-validator";

export class CreateCouponDto{

    @ApiProperty({example: 'весна2024', description: 'Название купона'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly couponTitle: string;

    @ApiProperty({example: '2000', description: 'Скидка купона'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly couponValue: string;

    @ApiProperty({example: '2024-04-13 00:46:13.636+04', description: 'Время жизни купона'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly couponTimelife: number;
}