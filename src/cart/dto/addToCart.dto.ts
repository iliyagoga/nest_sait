import { IsEmpty, IsNumber } from "class-validator";


export class AddToCartDto{

    @IsNumber({},{message:"Поле должно быть числом"})
    readonly productId: number;

    readonly varId: number;

    @IsNumber({},{message:"Поле должно быть числом"})
    readonly count: number;
}