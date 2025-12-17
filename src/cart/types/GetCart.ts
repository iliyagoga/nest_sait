import { ApiProperty } from "@nestjs/swagger";


export class GetCart{

    @ApiProperty({example:{

    }, description:'Получение товаров из козины + аттрибуты'})
    readonly carts: {res: any[], attrs: any}
}