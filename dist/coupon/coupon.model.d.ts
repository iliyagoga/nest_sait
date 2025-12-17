import { Model } from "sequelize-typescript";
import { Order } from "src/order/order.model";
export declare class Coupon extends Model<Coupon> {
    id: number;
    couponTitle: string;
    couponValue: string;
    couponTimelife: number;
    Order: Order[];
}
