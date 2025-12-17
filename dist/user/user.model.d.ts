import { Model } from "sequelize-typescript";
import { Order } from "src/order/order.model";
import { Product } from "src/products/product.model";
import { Role } from "src/role/role.model";
interface CreateUserAble {
    nickname: string;
    email: string;
    password: string;
}
export declare class User extends Model<User, CreateUserAble> {
    id: number;
    email: string;
    nickname: string;
    password: string;
    phone: number;
    firstName: string;
    secondName: string;
    fatherName: string;
    passportSeria: number;
    passportNumber: number;
    avatar: string;
    country: string;
    region: string;
    city: string;
    street: string;
    home: string;
    flat: string;
    role: Role[];
    product: Product[];
    order: Order[];
}
export {};
