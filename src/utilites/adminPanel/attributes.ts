import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts";
import { products } from "../axiosConfig.ts";

export class Attributes{
    async getAttributes(num:number){
        try {
            const res = await products.get(apiMap.products.getAttributes + "/" + (num||0),{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setAttrs(res.data);
        } catch (error) {
            throw error;
        }
    }
    async countPages(){
        try {
            const res = await products.get(apiMap.products.getCountAttributePages,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setCountAttrsPages(res.data);
        } catch (error) {
            throw error;
        }
    }

    async getAttributesValues(id: number, page:number){
        try {
            const res = await products.get(apiMap.products.getAttributesValues + "/" + (id) + "/"+page,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            AdminPanelStore.setAttrsValues(res.data);
        } catch (error) {
            throw error
        }
    }

    async deleteAttributeValue(id: number){
        try {
            const res = await products.post(apiMap.products.deleteAttributeValue, {id}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            return true;
        } catch (error) {
            throw error
        }
    }

    async createAttributeValue(attributeId: number, attributeValue: string){
        try {
            const res = await products.post(apiMap.products.addAttributeValue, {attributeId,  attributeValue},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
        } catch (error) {
            throw error
        }
    }

    async renameAttributeValue(attributeValueId: number, attributeValue: string){
        try {
            const res = await products.post(apiMap.products.renameAttributeValue, {attributeValueId,  attributeValue},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
        } catch (error) {
            throw error
        }
    }


    async getCountAttributeValuesPages(attributeId: number){
        try {
            const res = await products.get(apiMap.products.getCountAttributeValuesPages + '/'+ (attributeId || 0),{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setAttrValueCountPages(res.data);
        } catch (error) {
            throw error;
        }
    }

    async createAttribute(attributeName: string){
        try {
            const res = await products.post(apiMap.products.createAttribute,{attributeName},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
        } catch (error) {
            throw error;
        }
    }

    async renameAttribute(attributeValueId: number, attributeValue: string){
        try {
            const res = await products.post(apiMap.products.renameAttribute, {attributeValueId,  attributeValue},{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
        } catch (error) {
            throw error
        }
    }

    async deleteAttributes(){
        try {
            const res = await products.post(
                apiMap.products.deleteAttribute,
                {id: AdminPanelStore.getDeleteAttrs().map(v=>{ if(v.id!=null)return v.id})},
                {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            this.getAttributes(0);
            this.countPages();
        } catch (error) {
            throw error
        }
    }

}