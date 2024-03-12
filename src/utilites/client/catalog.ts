import Client from "../../stores/Client.ts";
import { apiMap } from "../apiMap.ts";
import { filters, products } from "../axiosConfig.ts";


class CatalogUtilite{
    constructor(){}

    async getGroups(){
        try {
            const res = await filters.get(apiMap.filters.getGroupsClient);
            Client.setGroups(res.data)
        } catch (error) {
            throw error;
        }
        
    }

    async getCategories(){
        try {
            const res = await filters.get(apiMap.filters.getCategoriesClient);
            Client.setCategories(res.data)
        } catch (error) {
            throw error;
        }
        
    
    }

    async getProductsCats(idGroup:number, idCategory: number, price: string, rating: string, order: string, limit: number, offset: number){
        try {
            const res = await products.get(apiMap.products.getProductsClientCats +'/'+ idGroup +'/'+ idCategory +'/'+ price +'/'+ rating +'/'+ order +'/'+ limit +'/'+offset)
            Client.setProducts(res.data)
        } catch (error) {
            throw error;
        }
    }
    async getProducts(price: string, rating: string, order: string, limit: number, offset: number){
        try {
            const res = await products.get(apiMap.products.getProductsClient +'/'+ price +'/'+ rating +'/'+ order +'/'+ limit +'/'+offset)
            Client.setProducts(res.data)
        } catch (error) {
            throw error;
        }
    }
    }
export default CatalogUtilite;