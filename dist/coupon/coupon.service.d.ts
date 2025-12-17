import { Coupon } from './coupon.model';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { RedactCouponDto } from './dto/redactCoupon.dto';
export declare class CouponService {
    private couponRepository;
    constructor(couponRepository: typeof Coupon);
    createCoupon(dto: CreateCouponDto): Promise<Coupon>;
    removeCoupon(ids: number[]): Promise<number>;
    redactCoupon(dto: RedactCouponDto): Promise<[affectedCount: number]>;
    getCoupons(): Promise<Coupon[]>;
    getCouponsLimit(page: number, limit: number, order: string): Promise<Coupon[]>;
    getCouponsPages(limit: number): Promise<number>;
    checkCoupon(id: number): Promise<number>;
}
