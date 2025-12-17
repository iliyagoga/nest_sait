import { Model } from "sequelize-typescript";
export declare class OrderProduct extends Model<OrderProduct> {
    id: number;
    varId: number;
    count: number;
    orderId: number;
    productId: number;
}
