import CartStore from "../../stores/CartStore.ts";
import { apiMap } from "../apiMap.ts";
import { cart } from "../axiosConfig.ts";

export class CartUtilite{
    constructor(){}

    async addToCart(productId: number, varId: number, count: number){
        try {
            const res = await cart.post(apiMap.cart.addToCart, {productId, varId, count}, {headers: {Authorization: 'Bearer '+ localStorage.getItem('token')}})
            
        } catch (error) {
            throw error;
        }
    }

    async getCart(){
        try {
            const res = await cart.get(apiMap.cart.getCart, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            CartStore.setCart(res.data)
        } catch (error) {
            throw error;
        }
    }
}