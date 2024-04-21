import CartStore from "../../stores/CartStore.ts";
import { apiMap } from "../apiMap.ts";
import { cart, coupons, orders } from "../axiosConfig.ts";

export class CartUtilite{
    constructor(){}

    async addToCart(productId: number, varId: number, count: number){
        try {
            const res = await cart.post(apiMap.cart.addToCart, {productId, varId, count}, {headers: {Authorization: 'Bearer '+ localStorage.getItem('token')}});
            this.countAll();
            return true;
            
        } catch (error) {
            throw error;
        }
    }

    async getCart(){
        try {
            const res = await cart.get(apiMap.cart.getCart, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            CartStore.clearSumma()
            CartStore.setCart(res.data.res[0])
            CartStore.setAttrs(res.data.attrs[0])
            res.data.res[0].map(v=>{
                CartStore.setSumma(v)
            })
            return true
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    filter(id: number){
        const res= CartStore.getAttrs().filter(v=>{
            if(v.productId==id){
                return v
            }
        })
        return res

    }

    async minusProduct(productId: number, varId: number){
        try {
            const res = await cart.post(apiMap.cart.minusProduct, {productId,varId}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            this.getCart()
            return res.data
           
        } catch (error) {
            throw error;
        }
    }

    async plusProduct(productId: number, varId: number){
        try {
            const res = await cart.post(apiMap.cart.plusProduct, {productId,varId}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            this.getCart()
            return res.data
        } catch (error) {
            throw error;
        }
    }

    async removeProduct(productId: number){
        try {
            const res = await cart.post(apiMap.cart.deleteProduct,{productId}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
            // this.getCart()
            this.countAll()
            return true
        } catch (error) {
            throw error;
        }
    }
    async countAll(){
        const res = await cart.get(apiMap.cart.countAll, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
        CartStore.setCount(res.data)
        return true
    }

    async getCoupon(coupon: string){
        const res = await cart.get(apiMap.coupons.getCoupon+'/'+coupon, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}})
        CartStore.setCouponValue(res.data.value)
        CartStore.setCouponID(res.data.id)
        return true
    }

    async createOrder(firstName: string, secondName: string, phone: string, email: string, comment: string, deliv: boolean, payment: boolean, country: string, region: string, city: string, street: string, home: string, flat: string, otd: string){
        if(CartStore.getCart().length==0){
            throw new Error("Корзина пуста");
        }
        if(firstName.length==0 || secondName.length==0 || phone.length==0 || email.length==0){
            throw new Error('Заполните персональные данные')
        }
        if(deliv==true){
            if(!country ||
                !region||
                !city||
                !street||
                !home ||
                !flat){
                    throw new Error('Заполните адрес доставки')
                }
        }
        if(deliv==false){
            if(!city || ! otd){
                throw new Error('Заполните поля доставки')
            }
        }
        const body={
            firstName,
            secondName,
            email,
            phone,
            comment,
            deliv,
            payment,
            country,
            region,
            city,
            street,
            home, 
            flat,
            otd,
            couponId: CartStore.getCouponId()
        };
        try {
            const res = await orders.post(apiMap.orders.createOrder, body, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}});
            this.getCart();
            this.countAll();
        } catch (error) {
            throw error;
        }
      
    }

    async changeVars(productId: number, varId: number, newVarId: number){
        try {
            const res = await cart.post(apiMap.cart.changeVars, {productId: Number(productId), varId: Number(varId), newVarId: Number(newVarId)}, {headers:{Authorization:'Bearer '+ localStorage.getItem('token')}});
            CartStore.setCart([])
            this.getCart()
            return res
        } catch (error) {
            throw error;
            
        }
    }
}