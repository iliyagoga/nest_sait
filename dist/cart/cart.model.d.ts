import { Model } from "sequelize-typescript";
export declare class Cart extends Model<Cart> {
    id: number;
    userId: number;
    productId: number;
    varId: number;
    count: number;
}
