
import { IsEmpty, IsNumber } from "class-validator";


export class RemoveFromCartDto{

    @IsEmpty({message:"Поле не должно быть пустым"})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly productId: number;

}