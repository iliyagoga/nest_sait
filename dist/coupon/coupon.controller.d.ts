import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { RedactCouponDto } from './dto/redactCoupon.dto';
import { Coupon } from './coupon.model';
export declare class CouponController {
    private couponService;
    constructor(couponService: CouponService);
    createCoupon(dto: CreateCouponDto): Promise<Coupon>;
    deleteCoupon(ids: number[]): Promise<number>;
    redactCoupon(dto: RedactCouponDto): Promise<[affectedCount: number]>;
    getCoupons(): Promise<Coupon[]>;
    getCouponsPages(limit: number): Promise<number>;
    getCouponsLimit(page: number, limit: number, order: string): Promise<Coupon[]>;
}
