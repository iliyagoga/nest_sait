import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts";
import { auth, role } from "../axiosConfig.ts";

export class AdminsUtilite{
    constructor(){}

    async getAdmins(){
        try {
            const res = await auth.get(apiMap.auth.getAdmins, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setAdmins(res.data)
        } catch (error) {
            throw error;
        }
    }

    async getAdmin(email: string){
        try {
            const res = await auth.post(apiMap.auth.getAdmin, {email},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            if(res.data.length==0){
                throw new Error('Такого пользователя нет')
            }
            AdminPanelStore.setAdmin(res.data)
        } catch (error) {
            throw error;
        }
    }


    async createAdmin(email:string){
        try {
            const res = await role.post(apiMap.role.createAdmin, {email}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getAdmins()
        } catch (error) {
            throw error;
        }
    }

    async deleteAdmin(email:string){
        try {
            const res = await role.post(apiMap.role.deleteAdmin, {email}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getAdmins()
        } catch (error) {
            throw error;
        }
    }
}