import { apiMap } from "../apiMap.ts";
import { coupons } from "../axiosConfig.ts";

export class CouponUtilite{
    constructor(){}

    async getCoupons(){
        try {
            const res = await coupons.get(apiMap.coupons.getCoupons,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
        } catch (error) {
            throw error;
        }
    }

    async createCoupon(couponTitle: string, couponValue: string, couponTimelife: number){
        try {
            const res = await coupons.post(apiMap.coupons.createCoupon, {couponTitle, couponValue, couponTimelife},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getCoupons();
        } catch (error) {
            throw error;
        }
    }

    async redactCoupon(id: number, couponTitle: string, couponValue: string, couponTimelife: number){
        try {
            const res = await coupons.post(apiMap.coupons.redactCoupon, {id, couponTitle, couponValue, couponTimelife},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getCoupons();
        } catch (error) {
            throw error;
        }
    }
    async deleteCoupon(id: number){
        try {
            const res = await coupons.post(apiMap.coupons.deleteCoupon, {id},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getCoupons()
        } catch (error) {;
            throw error;
        }
    }
}