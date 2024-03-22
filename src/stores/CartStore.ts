import { makeAutoObservable } from "mobx";

class CartStore{
    constructor(){
        makeAutoObservable(this)
    }

    private _cart: any[] = []

    getCart(){
        return this._cart;
    }

    setCart(cart: any[]){
        this._cart=cart;
    }

    addCart(product: object){
        this._cart.push(product);
    }
}

export default new CartStore()