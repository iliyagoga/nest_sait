
import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";


export class RemoveFromCartDto{

    @ApiProperty({example:'7', description: 'id товара'})
    @IsEmpty({message:"Поле не должно быть пустым"})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly productId: number;

}