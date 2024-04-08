import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts";
import { orders } from "../axiosConfig.ts";

export class Orders{
    constructor(){}

    async getOrders(page: number, limit: number, order: number=4){
        try {
            const res = await orders.get(apiMap.orders.getOrders+'/'+page+'/'+limit+'/'+ order, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setOrders(res.data)
        } catch (error) {
            throw error;
        }

    }

    async getCountPages(limit: number=6){
        try {
            const res = await orders.get(apiMap.orders.getCountPages+'/'+limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setCountOrdersPages(res.data)
        } catch (error) {
            throw error;
        }
    }
}