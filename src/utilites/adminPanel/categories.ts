import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts"
import { filters } from "../axiosConfig.ts"

export class Categories{

    constructor(){}

    async getGroups(page:number){
        try {
            const res= await filters.get(apiMap.filters.getGroups+"/"+ (page || 0), {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setGroups(res.data);
        } catch (error) {
            throw error;
        }
      
    }

    async getGroupsCountPages(){
        try {
            const res = await filters.get(apiMap.filters.getGroupsCountPages,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setGroupsCountPages(res.data);
        } catch (error) {
            throw error;
        }
    
    }

    async createGroup(){
        try {
            const res = await filters.post(apiMap.filters.createGroup, {groupTitle: AdminPanelStore.getCreateGroup()}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            this.getGroupsCountPages();
        } catch (error) {
            throw error;
        }
    }

    async renameGroup(){
        try {
            const res = await filters.post(apiMap.filters.renameGroup, {id:AdminPanelStore.getRenameGroupId(), groupTitle: AdminPanelStore.getRenameGroup()}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})

        } catch (error) {
            throw error;
        }
        
    }

    async removeGroup(){
        try {
            const res = await filters.post(
                apiMap.filters.removeGroup, 
                {ids: AdminPanelStore.getDeletesGroup().map(v=>{ if(v.id!=null)return v.id})},
                {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            this.getGroups(0);
            this.getGroupsCountPages();
        } catch (error) {
            throw error;
        }
       
        
    }
    async getCategoriesByGroup(id: number, page: number){
        try {
            const res = await filters.get(apiMap.filters.getCategoriesByGroup + "/" + id + "/" + page,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setCategories(res.data);
        } catch (error) {
            throw error;
        }
       
    }

    async createCategory(id: number, name: string){
        try {
            const res = await filters.post(apiMap.filters.createCategory, {groupId: id, categoryName: name}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
        } catch (error) {
            throw error;
        }
        
    }

    async removeCategory(id: number){
        try {
            const res = await filters.post(apiMap.filters.removeCategory, {id}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            return res.data;
        } catch (error) {
            throw error;
        }
    }

    async getCategoriesCountPages(id: number){
        try {
            const res = await filters.get(apiMap.filters.getCategoriesCountPages + '/' + id,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setCategoriesCountPages(res.data);
        } catch (error) {
            throw error;
        }
    
    }

    async renameCategory(id: number,name: string ){
        try {
            const res = await filters.post(apiMap.filters.renameCategory, {id, categoryName: name}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})

        } catch (error) {
            throw error;
        }
        
    }
}