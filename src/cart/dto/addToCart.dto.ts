import { IsEmpty, IsNumber } from "class-validator";


export class AddToCartDto{

    @IsEmpty({message:"Поле не должно быть пустым"})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly productId: number;

 

    @IsEmpty({message:"Поле не должно быть пустым"})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly userId: number;

    @IsEmpty({message:"Поле не должно быть пустым"})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly count: number;
}