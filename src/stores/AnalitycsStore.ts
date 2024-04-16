import { makeAutoObservable } from "mobx";

class AnalitycsStore{
    constructor(){
        makeAutoObservable(this);
    }

    private _orders: any[];
    private _countUsers: number =  0;
    private _topProducts: any[];
    private _topCategories: any[];
    private _topCoupons: any[];

    setOrders(data: any[0]){
        this._orders=data;
    }

    getOrders(){
        return this._orders;
    }

    setCountUsers(count: number){
        this._countUsers=count;
    }

    getCountUsers(){
        return this._countUsers;
    }

    setTopProducts(products: any[]){
        this._topProducts=products;
    }

    getTopProducts(){
        return this._topProducts;
    }

    setTopCategories(cs: any[]){
        this._topCategories=cs;
    }

    getTopCategories(){
        return this._topCategories;
    }

    setTopCoupons(cs: any[]){
        this._topCoupons=cs;
    }

    getTopCoupons(){
        return this._topCoupons;
    }
}

export default new AnalitycsStore;