import { apiMap } from "../apiMap.ts";
import { analitycs } from "../axiosConfig.ts";

export class Ans{

    async getOrderByWeek(){
        try {
            const res = await analitycs.get(apiMap.analitycs.getOrderByWeek, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getOrderByMounth(){
        try {
            const res = await analitycs.get(apiMap.analitycs.getOrderByMounth, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getOrderByYear(){
        try {
            const res = await analitycs.get(apiMap.analitycs.getOrderByYear, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getCountUsers(){
        try {
            const res = await analitycs(apiMap.analitycs.getCountUsers, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getTopProduct(limit: number){
        try {
            const res = await analitycs(apiMap.analitycs.getTopProoduct+'/'+limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getTopCategory(limit: number){
        try {
            const res = await analitycs(apiMap.analitycs.getTopCategory+'/'+limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data[0];
        } catch (error) {
            throw error;
        }
    }

    async getTopCoupons(limit: number){
        try {
            const res = await analitycs(apiMap.analitycs.getTopCoupons+'/'+limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}