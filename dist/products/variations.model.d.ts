import { Model } from "sequelize-typescript";
import { Cart } from "src/cart/cart.model";
export declare class Variations extends Model<Variations> {
    id: number;
    productId: number;
    attributeValueId: number;
    orders: Cart[];
}
