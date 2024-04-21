import { makeAutoObservable } from "mobx";

class ErrorsStore{
    constructor(){makeAutoObservable(this)}

    private _errorText: string =""
    private _successText: string =""

    setErrorText(error: string){
        this._errorText = error;
    }

    getErrorText(){
        return this._errorText;
    }

    setSuccessText(success: string){
        this._successText = success;
    }

    getSuccessText(){
        return this._successText;
    }
}

export default new ErrorsStore()