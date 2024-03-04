import {makeAutoObservable} from 'mobx'
class AuthStore{
    constructor(){
        makeAutoObservable(this)
    }

    private _token: number;

    private _nickname: string;

    private _emailValue: string = "";

    private _pass: string = "";

    private _repass: string = "";

    getAuth(){
        return this._token;
    }

    setAuth(token: number){
        this._token=token;
    }

    getNick(){
        return this._nickname;
    }

    setNick(nickname: string){
        this._nickname=nickname;
    }

    getEmail(){
        return this._emailValue;
    }

    setEmail(emailValue: string){
        this._emailValue=emailValue;
    }

    getPass(){
        return this._pass;
    }

    setPass(pass: string){
        this._pass=pass;
    }

    getRePass(){
        return this._repass;
    }

    setRePass(repass: string){
        this._repass=repass;
    }
}

export default new AuthStore()