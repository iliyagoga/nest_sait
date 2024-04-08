import { IsNumber} from "class-validator";

export class GetOrderDto{
    @IsNumber({},{message: 'Должно быть числом'})
    page: number;
    @IsNumber({},{message: 'Должно быть числом'})
    limit: number;
    @IsNumber({},{message: 'Должно быть числом'})
    vars: number;
}