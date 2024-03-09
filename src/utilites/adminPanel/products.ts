import { filters, products } from "../axiosConfig.ts"
import AdminPanelStore from "../../stores/AdminPanelStore.ts";
import { apiMap } from "../apiMap.ts"
import { HttpStatusCode } from "axios";

export class Products{
    constructor(){

    }

    async getGroups(page: number, limit: number){
        try {
            const res = await filters.get(apiMap.filters.getGroups + "/" + page + "/" + limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setProductGroups(res.data);
        } catch (error) {
            throw error;
        }
    }
    async getCategoies(page: number, id: number, limit: number){
        try {
            const res = await filters.get(apiMap.filters.getCategoriesByGroup + "/" + id + "/" + page + "/" + limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setProductCategories(res.data);
        } catch (error) {
            throw error;
        }
    }

    async getTags(){
        try {
            const res = await filters.get(apiMap.filters.getTags)
            AdminPanelStore.setProductsTags(res.data);
        } catch (error) {
            throw error;
        }
    }

    
    async getAttributes(page: number, limit: number){
        try {
            const res = await products.get(apiMap.products.getAttributes + "/" + page + "/" + limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setProductsAttrs(res.data);
        } catch (error) {
            throw error;
        }
    }

    async getAttributesValuesLimit(id: number, page: number, limit: number){
        try {
            const res = await products.get(apiMap.products.getAttributesValues + "/" + id + "/" + page + "/" + limit, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            AdminPanelStore.setProductsAttrsValues(res.data);
        } catch (error) {
            throw error;
        }
    }

    async createProduct(){
        try {
            let formdata= new FormData()
            if(AdminPanelStore.getName()==undefined){
                throw new Error('Имя товара не должно быть пустым')
            }

            if(AdminPanelStore.getTitle()==undefined){
                throw new Error('Краткое описание товара не должно быть пустым')
            }
            let atrsIds: number[]=[]
            for(let u of AdminPanelStore.getActualAttrValuesIds()){
                for(let i of u.avVIds){
                    atrsIds.push(i)
                }
               
            }
            formdata.append("productName", AdminPanelStore.getName())
            formdata.append("title",AdminPanelStore.getTitle())
            formdata.append("description", AdminPanelStore.getDescr())
            formdata.append("price", String(AdminPanelStore.getOldPrice()))
            formdata.append("sale_price", String(AdminPanelStore.getNewPrice()))
            formdata.append("categories", JSON.stringify(AdminPanelStore.getActualCategories()))
            formdata.append("tags", JSON.stringify(AdminPanelStore.getActualTagsIds()))
            formdata.append("attributes", JSON.stringify(atrsIds))
            if(AdminPanelStore.getImgFile()!=undefined){
                formdata.append('img', AdminPanelStore.getImgFile())
            }
            const res = await products.post(apiMap.products.createProduct,
               formdata
            ,{headers:{
                Authorization:('Bearer '+ localStorage.getItem('token')),
                "Content-Type": 'multipart/form-data'
            }})
            this.createGalleryProduct(res.data.id)
            if(res)
                return true
            else
                return false
        } catch (error) {
            throw error;
        }
    }
    async getProducts(page: number, limit: number, rating: string, date: string, search: string){
        const res= await products.get(apiMap.products.getProducts + '/' + page + '/' + limit + '/' + rating + '/' + date + '/' +search, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
        AdminPanelStore.setProducts(res.data)
    }

    async getProduct(id: number){
        const res = await products.get(apiMap.products.getProduct + '/' + id,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
        AdminPanelStore.setActualProduct(res.data)
        for(let y of res.data['res']['gallery']){
            AdminPanelStore.setUploadImages(apiMap.host+':'+apiMap.port+'/'+y.title)
        }
  
    }

    async getPhotos(){
        const res = await products.get(apiMap.products.getPhotos,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
        AdminPanelStore.setPhotos(res.data)
       
  
    }

    async createGalleryProduct(id: number){
        const formdata= new FormData()
        formdata.append('id', String(id))
        for(let y=0; y < AdminPanelStore.getCreateGallery().length; y++){
            formdata.append("img", AdminPanelStore.getCreateGallery()[y].file)
        }

        await products.post(apiMap.products.createGalleryProduct,formdata,{headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}}) 


    }

    async updateProduct(){
        try {
            let formdata= new FormData()
            if(AdminPanelStore.getName()==undefined){
                throw new Error('Имя товара не должно быть пустым')
            }

            if(AdminPanelStore.getTitle()==undefined){
                throw new Error('Краткое описание товара не должно быть пустым')
            }
            let atrsIds: number[]=[]
            for(let u of AdminPanelStore.getActualAttrValuesIds()){
                for(let i of u.avVIds){
                    atrsIds.push(i)
                }
               
            }
            formdata.append("id", String(AdminPanelStore.getActualProductId()))
            formdata.append("productName", AdminPanelStore.getName())
            formdata.append("title",AdminPanelStore.getTitle())
            formdata.append("description", AdminPanelStore.getDescr())
            formdata.append("price", String(AdminPanelStore.getOldPrice()))
            formdata.append("sale_price", String(AdminPanelStore.getNewPrice()))
            formdata.append("categories", JSON.stringify(AdminPanelStore.getActualCategories()))
            formdata.append("tags", JSON.stringify(AdminPanelStore.getActualTagsIds()))
            formdata.append("attributes", JSON.stringify(atrsIds))
           
            if(AdminPanelStore.getImgFile()!=undefined){
                formdata.append('previews',URL.createObjectURL(AdminPanelStore.getImgFile()))
                formdata.append('img', AdminPanelStore.getImgFile())
            }
            else{
                formdata.append('previews',"")
            }
            const res = await products.post(apiMap.products.updateProduct,
               formdata
            ,{headers:{
                Authorization:('Bearer '+ localStorage.getItem('token')),
                "Content-Type": 'multipart/form-data'
            }})
            this.updateGalleryProduct()
            if(res)
                return true
            else
                return false
        } catch (error) {
            throw error;
        }
    }
    async updateGalleryProduct(){
        const formdata = new FormData()
        formdata.append('id',String(AdminPanelStore.getActualProductId()))
        formdata.append('gallery', JSON.stringify(AdminPanelStore.getUploadImages()))
        for(let y=0; y < AdminPanelStore.getUploadGallery().length; y++){
            formdata.append("img", AdminPanelStore.getUploadGallery()[y].file)
        }
        await products.post(apiMap.products.updateGalleryProduct, formdata, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}}) 

    }

    async productCountPages(limit: number, price: string, rating: string, search: string){
        const res = await products.get(apiMap.products.getProductCountPages + '/' + limit + '/' + price + '/' + rating + '/' +search, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}}) 
        AdminPanelStore.setProductCountPages(res.data)
        AdminPanelStore.setProductPage(0)
    }
    
    async deleteProduct(){
        try {
            await products.post(apiMap.products.deleteProduct, {id: AdminPanelStore.getActualProductId()}, {headers:{Authorization:('Bearer '+ localStorage.getItem('token'))}})
            return true
        } catch (error) {
            return error
        }
       
    }
}