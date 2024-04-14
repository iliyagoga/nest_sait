import { IsNumber, Length, MinLength } from "class-validator";

export class OrderDto{
    @MinLength(1,{message:"Поле не должно быть пустым"})
    firstName: string;

    @MinLength(1,{message:"Поле не должно быть пустым"})
    secondName: string;

    @MinLength(1,{message:"Поле не должно быть пустым"})
    email: string;

    @MinLength(1,{message:"Поле не должно быть пустым"})
    phone: string;

    comment: string;

    deliv: boolean;

    payment: boolean;

    country: string;

    region: string;

    city: string;

    street: string;

    home: string;

    flat: string;

    otd: string;

    couponId: number;
    
}