import { Model } from "sequelize-typescript";
export declare class AddresOrder extends Model<AddresOrder> {
    id: number;
    country: string;
    region: string;
    city: string;
    street: string;
    home: string;
    flat: string;
    orderId: number;
}
