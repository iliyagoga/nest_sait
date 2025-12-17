import { AnalitycsService } from './analitycs.service';
import { Product } from 'src/products/product.model';
import { Coupon } from 'src/coupon/coupon.model';
export declare class AnalitycsController {
    private analitycsService;
    constructor(analitycsService: AnalitycsService);
    getOrderWeek(): Promise<{
        labels: any[];
        values: any[];
    }>;
    getOrderMounth(): Promise<{
        labels: any[];
        values: any[];
    }>;
    getOrderYear(): Promise<{
        labels: any[];
        values: any[];
    }>;
    getCountUsers(): Promise<number>;
    getTopProduct(limit: number): Promise<Product[]>;
    getTopCategory(limit: number): Promise<[unknown[], unknown]>;
    getTopCoupon(limit: number): Promise<Coupon[]>;
}
