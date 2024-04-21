import { auth } from '../axiosConfig.ts';
import { apiMap } from '../apiMap.ts';
import AuthStore from '../../stores/AuthStore.ts';
import Client from '../../stores/Client.ts';
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

    async checkToken(){
        try {
            const res = await auth.post(apiMap.auth.checkToken,{},{headers: {Authorization: 'Bearer '+localStorage.getItem('token')}})
            if(res.data!=false){
                Client.setUser(res.data)
                return true
            }
            return false
        } catch (error) {
            throw error;
        }
       
    }

    async updateUser(
        name: string, 
        sername: string, 
        fathername: string,
        email: string, 
        phone: number, 
        country: string, 
        region: string, 
        city: string, 
        street: string, 
        home: string, 
        flat: string, 
        avatarFile: Blob,
        avatar: string, 
        passportSeria: string, 
        passportNumber: string,
        token: object){
        const formdata = new FormData()
        formdata.append('firstName',name&&name.length>0?name:'')
        formdata.append('secondName', sername&&sername.length>0?sername:'')
        formdata.append('fatherName', fathername&&fathername.length>0?fathername:'')
        formdata.append('email',email&&email.length>0?email:'')
        formdata.append('phone', phone&&String(phone).length>0?String(phone):'')
        formdata.append('country',country&&country.length>0?country:'')
        formdata.append('region',region&&region.length>0?region:'')
        formdata.append('street',street&&street.length>0?street:'')
        formdata.append('city',city&&city.length>0?city:'')
        formdata.append('home',home&&home.length>0?home:'')
        formdata.append('flat',flat&&flat.length>0?flat:'')
        if(token['role']!=undefined && token['role'][0].role=='ADMIN'){
            formdata.append('passportSeria', passportSeria)
            formdata.append('passportNumber', passportNumber)
        }
        formdata.append('avatarTitle', avatar?avatar.split('/')[3]:'')
        formdata.append('avatar', avatarFile)
        const res = await auth.post(apiMap.auth.updateUser, formdata, {headers:{Authorization: 'Bearer '+localStorage.getItem('token')}})
        return res.data
    }
}