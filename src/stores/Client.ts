import { makeAutoObservable } from "mobx";

class Client{
    constructor(){
        makeAutoObservable(this)
    }

    private _groups: any[];

    getGroups(){
        return this._groups;
    }

    setGroups(groups: any[]){
        this._groups=groups;
    }
}
export default new Client()