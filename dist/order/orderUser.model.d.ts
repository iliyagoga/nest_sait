import { Model } from "sequelize-typescript";
export declare class OrderUser extends Model<OrderUser> {
    id: number;
    email: string;
    phone: number;
    firstName: string;
    secondName: string;
    orderId: number;
}
