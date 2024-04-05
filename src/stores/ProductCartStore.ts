import { makeAutoObservable } from "mobx";

export class ProductCartStore{
    constructor(){
        makeAutoObservable(this);
    }

    private _slider: number= 1;

    getSlider(){
        return this._slider;
    }

    setSlider(sl: number){
        this._slider=sl;
    }

}