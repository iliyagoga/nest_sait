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

    async updateStatus(id: number, orderStatus: number){
        try {
            const res = await orders.post(apiMap.orders.updateStatus, {id, orderStatus}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getOrders(AdminPanelStore.getOrderPage(), 6, 4)
        } catch (error) {
            throw error;
        }
    }

    async getOrder(id: number){
        try {
            const res = await orders.get(apiMap.orders.getOrder+'/'+id, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setOrder(res.data)
        } catch (error) {
            throw error;
        }
    }
}