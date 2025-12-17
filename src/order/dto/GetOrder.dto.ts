import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class GetOrderDto{
    @ApiProperty({example: '1', description: 'Номер страницы'})
    @IsNumber({},{message: 'Должно быть числом'})
    page: number;
    @ApiProperty({example: '7', description: 'Лимит записей на странице'})
    @IsNumber({},{message: 'Должно быть числом'})
    limit: number;
    @ApiProperty({example: '1', description: 'id вариации'})
    @IsNumber({},{message: 'Должно быть числом'})
    vars: number;
}