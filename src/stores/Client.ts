import { makeAutoObservable } from "mobx";

class Client{
    constructor(){
        makeAutoObservable(this)
    }

    private _groups: any[];
    private _categories: any[]=[]
    private _products: any[]
    private _priceFilter: string ="null";
    private _ratingFilter: string = "null";
    private _orderFilter: string = "null";
    private _category: {idGroup: number, idCat: number} | undefined;


    getGroups(){
        return this._groups;
    }

    setGroups(groups: any[]){
        this._groups=groups;
    }

    getCategories(){
        return this._categories;
    }
    setCategories(cats: any[]){
        this._categories= cats
    }

    getProducts(){
        return this._products;
    }
    setProducts(products: any[]){
        this._products= products
    }

    getPriceFilter(){
        return this._priceFilter;
    }

    setPriceFilter(price: string){
        this._priceFilter = price;
    }

    getRatingFilter(){
        return this._ratingFilter;
    }

    setRatingFilter(rating: string){
        this._ratingFilter = rating;
    }

    getOrderFilter(){
        return this._orderFilter;
    }

    setOrderFilter(order: string){
        this._orderFilter = order;
    }

    getCategory(){
        return this._category;
    }

    setCategory(idGroup: number, idCat: number){
        this._category={idGroup, idCat};
    }

    clearCategory(){
        this._category=undefined;
    }
}
export default new Client()