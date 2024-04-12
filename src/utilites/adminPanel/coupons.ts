
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts";
import { coupons } from "../axiosConfig.ts";

export class CouponUtilite{
    constructor(){}

    async getCoupons(page: number, limit: number, order: boolean | null){
        try {
            const res = await coupons.get(apiMap.coupons.getCoupons+'/'+page+'/'+limit+'/'+order,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setCoupons(res.data)
        } catch (error) {
            throw error;
        }
    }

    async getCouponsPages(limit: number){
        try {
            const res= await coupons.get(apiMap.coupons.getCouponsPages+'/'+limit,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setCouponsPages(res.data)
        } catch (error) {
            throw error;
        }
    }

    async createCoupon(couponTitle: string, couponValue: string, couponTimelife: number){
        try {
            const res = await coupons.post(apiMap.coupons.createCoupon, {couponTitle, couponValue, couponTimelife},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getCoupons(0,6,null);
        } catch (error) {
            throw error;
        }
    }

    async redactCoupon(id: number, couponTitle: string, couponValue: string, couponTimelife: number){
        try {
            const res = await coupons.post(apiMap.coupons.redactCoupon, {id, couponTitle, couponValue, couponTimelife},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getCoupons(0,6,null);
        } catch (error) {
            throw error;
        }
    }
    async deleteCoupon(ids: number[]){
        try {
            const res = await coupons.post(apiMap.coupons.deleteCoupon, {ids},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getCoupons(0,6,null);
            this.getCouponsPages(6);
        } catch (error) {;
            throw error;
        }
    }
}