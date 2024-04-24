import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber } from "class-validator";


export class AddToCartDto{

    @ApiProperty({example:'5', description: 'id товара'})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly productId: number;

    @ApiProperty({example:'2', description: 'id вариации'})
    readonly varId: number;

    @ApiProperty({example:'7', description: 'Количество товара'})
    @IsNumber({},{message:"Поле должно быть числом"})
    readonly count: number;
}