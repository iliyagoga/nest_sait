import { IsEmpty, IsNumber } from "class-validator";

export class RedactCouponDto{

    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsNumber({},{message:"Значнеие должно быть числом"})
    readonly id: number;
    readonly couponTitle: string;

    readonly couponValue: string;
    readonly couponTimelife: number;
}