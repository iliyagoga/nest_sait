import Client from "../../stores/Client.ts";
import { apiMap } from "../apiMap.ts";
import { filters } from "../axiosConfig.ts";


class CatalogUtilite{
    constructor(){}

    async getGroups(){
        try {
            const res = await filters.get(apiMap.filters.getGroupsClient,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}});
            Client.setGroups(res.data)
        } catch (error) {
            throw error;
        }
        
    }
}
export default CatalogUtilite;