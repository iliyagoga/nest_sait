import { auth } from '../axiosConfig.ts';
import { apiMap } from '../apiMap.ts';
import AuthStore from '../../stores/AuthStore.ts';
export class Reg{
    private nickname: string | null = null;
    private email: string | null = null;
    private pass: string | null = null;
    private repass: string | null = null;

    constructor(nickname: string, email: string, pass: string, repass: string){
        this.nickname=nickname;
        this.email=email;
        this.pass=pass;
        this.repass=repass;
    }

    async registration(){
        if(this.nickname && this.email && this.pass && this.repass){
            if(this.pass==this.repass){
                try {
                    const res= await auth.post(apiMap.auth.reg,
                        {
                            nickname: this.nickname,
                            email: this.email,
                            password: this.pass
    
                        })
                    localStorage.setItem('token',res.data.token);
                    AuthStore.setAuth(res.data.token);
                    return true;
                } catch (error) {

                    throw error
                }
            }
            else{
                throw new Error("Пароли не сходятся")
            }
            
        }
        else{
            const arr: any={atten:[]}
            if(this.nickname==null || this.nickname.length==0 ){
                arr.atten.push({type:"nick"})
            }
            if(this.email==null || this.email.length==0){
                arr.atten.push({type:"email"})
            }
            if(this.pass==null || this.pass.length==0){
                arr.atten.push({type:"pass"})
            }
            if(this.repass==null || this.repass.length==0){
                arr.atten.push({type:"repass"})
            }
            throw arr
        }
    }

    async login(){
        if(this.nickname && this.pass ){
            try {
                const res= await auth.post(apiMap.auth.login,
                    {
                        nickname: this.nickname,
                        password: this.pass

                    })
                localStorage.setItem('token',res.data.token);
                AuthStore.setAuth(res.data.token);
                return true;
            } catch (error) {

                throw error
            }
        }
            
    }
}