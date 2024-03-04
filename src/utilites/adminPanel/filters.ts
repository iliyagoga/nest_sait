import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts";
import { filters } from "../axiosConfig.ts";

export class Filters{

    async getCountTags(num:number){
        try {
            const res = await filters.get(apiMap.filters.getCountTags+'/'+(num|| 0),{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setTags(res.data);
        } catch (error) {
            throw error;
        }
    }
    async countPages(){
        try {
            const res = await filters.get(apiMap.filters.countTags,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setCountTagPages(res.data);
        } catch (error) {
            throw error;
        }
    }

    async createTag(){
        try {
            if(AdminPanelStore.getTagTitle()!=undefined){
                try {
                    await filters.post(apiMap.filters.createTag, {tagTitle: AdminPanelStore.getTagTitle()}, {headers:{Authorization: ('Bearer '+ localStorage.getItem('token'))}});
                    await this.getCountTags(0);
                    await this.countPages();
                } catch (error) {
                    throw error;
                }
               
            }
           

        } catch (error) {
            throw error;
        }

    }

    async redactTag(tag:object){
        try {
            await filters.post(apiMap.filters.redactTag, {id: tag['id'],tagTitle: AdminPanelStore.getTagTitle()}, {headers:{Authorization: ('Bearer '+ localStorage.getItem('token'))}});
            tag['tagTitle']=AdminPanelStore.getTagTitle()
        } catch (error) {
            throw error;
        }

    }

    async removetag(){
        try {
            await filters.post(
                apiMap.filters.removeTag, 
                {tags:AdminPanelStore.getDeletes().map(v=>{return v.id})}, 
                {headers:{Authorization: ('Bearer '+ localStorage.getItem('token'))}
            });
            await this.countPages();
            await this.getCountTags(AdminPanelStore.getTagPage());

        } catch (error) {
            throw error
        }
    }

}