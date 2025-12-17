import { ApiProperty } from "@nestjs/swagger";

export class GetProduct{

    @ApiProperty({example: '[1,2,3]', description: 'id тегов'})
    readonly tags: number[]
    @ApiProperty({example: '[1,2,3]', description: 'id категорий'})
    readonly categories: number[]
    @ApiProperty({example: '20', description: 'Минимальная цена'})
    readonly min_price: number;
    @ApiProperty({example: '200', description: 'Миаксимальная цена'})
    readonly max_price: number;
    
}