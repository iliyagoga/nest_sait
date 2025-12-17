import { Coupon } from 'src/coupon/coupon.model';
import { Order } from 'src/order/order.model';
import { Product } from 'src/products/product.model';
import { User } from 'src/user/user.model';
export declare class AnalitycsService {
    private orderRepository;
    private userRepository;
    private productRepository;
    private couponRepository;
    constructor(orderRepository: typeof Order, userRepository: typeof User, productRepository: typeof Product, couponRepository: typeof Coupon);
    getOrder(mode: string): Promise<{
        labels: any[];
        values: any[];
    }>;
    getCountUsers(): Promise<number>;
    getTopProduct(limit: number): Promise<Product[]>;
    getTopCategory(limit: number): Promise<[unknown[], unknown]>;
    getTopCoupons(limit: number): Promise<Coupon[]>;
}
