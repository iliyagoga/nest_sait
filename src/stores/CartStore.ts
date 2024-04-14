import { makeAutoObservable } from "mobx";

class CartStore{
    constructor(){
        makeAutoObservable(this)
    }

    private _cart: any[] = []
    private _attrs: any[] = []
    private _summa: number =0
    private _count: number =0;
    private _couponValue: number = 0;
    private _couponId: number | null = null;

    getCart(){
        return this._cart;
    }

    setCart(cart: any[]){
        this._cart=cart;
    }

    addCart(product: object){
        this._cart.push(product);
    }

    getAttrs(){
        return this._attrs;
    }

    setAttrs(attrs: any[]){
        this._attrs=attrs;
    }

    addAttrs(attr: object){
        this._attrs.push(attr);
    }

    getSum(){
        return this._summa;
    }
    
    setSumma(v: object){
        if(Number(v['sale_price'])>0){
            this._summa+=v['sale_price']*v['cart'][0]['count'];
        }
        else{
            this._summa+=v['price']*v['cart'][0]['count'];
        }
    }

    clearSumma(){
        this._summa=0;
    }

    getCount(){
        return this._count;
    }

    setCount(count: number){
        this._count=count;
    }

    getCouponValue(){
        return this._couponValue;
    }
    setCouponValue(coupon: string){
        this._couponValue =  Number(coupon);
    }

    getCouponId(){
        return this._couponId;
    }
    setCouponID(id: string){
        this._couponId = Number(id);
    }
}

export default new CartStore()