import { IsEmpty, IsNumber} from "class-validator";

export class RedactProductDto{
    @IsNumber({},{message:"Должно быть числом"})
    readonly id: number;

    readonly productName: string;

    readonly title: string;

    readonly description: string;

    readonly price: number;

    readonly sale_price: number;

    readonly categories: number[];

    readonly tags: number[];

    readonly attributes: number[];



}