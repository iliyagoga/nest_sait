import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber} from "class-validator";

export class RedactProductDto{
    @ApiProperty({example: '1', description: 'id продукта'})
    @IsNumber({},{message:"Должно быть числом"})
    readonly id: number;

    @ApiProperty({example: 'Гантель', description: 'Название товара'})
    readonly productName: string;

    @ApiProperty({example: '...', description: 'Краткое описание товара'})
    readonly title: string;

    @ApiProperty({example: '..........', description: 'Описание товара'})
    readonly description: string;

    @ApiProperty({example: '1000', description: 'Цена товара'})
    readonly price: number;

    @ApiProperty({example: '200', description: 'Акционная цена товара'})
    readonly sale_price: number;

    @ApiProperty({example: '[1,2,3,4]', description: 'id категорий'})
    readonly categories: number[];

    @ApiProperty({example: '[1,2,3,4]', description: 'id тегов'})
    readonly tags: number[];

    @ApiProperty({example: '[1,2,3,4]', description: 'id атрибутов'})
    readonly attributes: number[];
    




}