import { Model } from "sequelize-typescript";
import { AddresOrder } from "./addresOrder.model";
import { OrderProduct } from "./orderProduct.model";
import { OrderUser } from "./orderUser.model";
import { Product } from "src/products/product.model";
export declare class Order extends Model<Order> {
    id: number;
    orderStatus: string;
    comment: string;
    deliv: boolean;
    payment: boolean;
    userId: number;
    couponId: number;
    addresOrder: AddresOrder[];
    orderProduct: OrderProduct[];
    orderUser: OrderUser[];
    products: Product[];
}
