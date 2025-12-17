import { OrderService } from './order.service';
import { OrderDto } from './dto/Order.dto';
import { Order } from './order.model';
export declare class OrderController {
    private orderRepository;
    constructor(orderRepository: OrderService);
    createOrder(auth: string, body: OrderDto): Promise<boolean>;
    getOrders(page: number, limit: number, vars: number): Promise<Order[]>;
    getCountPages(limit: number): Promise<number>;
    updateStatus(id: number, orderStatus: number): Promise<boolean>;
    getOrder(id: number): Promise<{
        order: Order;
        user: import("./orderUser.model").OrderUser;
        addres: import("./addresOrder.model").AddresOrder;
        products: [unknown[], unknown];
        sum: number;
        coupon: import("../coupon/coupon.model").Coupon;
    }>;
    removeOrders(ids: number[]): Promise<boolean>;
}
