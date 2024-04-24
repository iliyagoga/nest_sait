import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";

export class RedactCouponDto{

    @ApiProperty({example: '1', description: 'id купона'})
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsNumber({},{message:"Значнеие должно быть числом"})
    readonly id: number;

    @ApiProperty({example: 'весна2024', description: 'Название купона'})
    readonly couponTitle: string;

    @ApiProperty({example: '2000', description: 'Скидка купона'})
    readonly couponValue: string;
    
    @ApiProperty({example: '2024-04-13 00:46:13.636+04', description: 'Время жизни купона'})
    readonly couponTimelife: number;
}