import CartStore from "../../stores/CartStore.ts";
import { apiMap } from "../apiMap.ts";
import { cart } from "../axiosConfig.ts";

export class CartUtilite{
    constructor(){}

    async addToCart(productId: number, varId: number, count: number){
        try {
            const res = await cart.post(apiMap.cart.addToCart, {productId, varId, count}, {headers: {Authorization: 'Bearer '+ localStorage.getItem('token')}})
            this.countAll()
            
        } catch (error) {
            throw error;
        }
    }

    async getCart(){
        try {
            const res = await cart.get(apiMap.cart.getCart, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            CartStore.setCart(res.data.res)
            CartStore.clearSumma()
            res.data.res.map(v=>{
                CartStore.setSumma(v)
            })
            CartStore.setAttrs(res.data.attrs)
        } catch (error) {
            throw error;
        }
    }

    filter(id: number){
        let ac: any=null;
        const res= CartStore.getAttrs().filter(v=>{
            for(let y of v['attributeValue']){
                for(let i of y['variations']){
                    if(i.productId==id){
                        ac=y;
                        return v
                    }
                }
            }
        })
        return {res,ac}

    }

    async minusProduct(productId: number){
        try {
            const res = await cart.post(apiMap.cart.minusProduct, {productId}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            this.getCart()
            return res.data
           
        } catch (error) {
            throw error;
        }
    }

    async plusProduct(productId: number){
        try {
            const res = await cart.post(apiMap.cart.plusProduct, {productId}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            this.getCart()
            return res.data
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(productId: number){
        try {
            const res = await cart.post(apiMap.cart.deleteProduct,{productId}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            this.getCart()
            this.countAll()
            return true
        } catch (error) {
            throw error;
        }
    }
    async countAll(){
        const res = await cart.get(apiMap.cart.countAll, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
        CartStore.setCount(res.data)
    }
}