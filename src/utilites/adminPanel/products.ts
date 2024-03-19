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
            let atrsVarsIds: number[]=[]
            const atrsV=AdminPanelStore.getActualAttrValueVarsIds()
            if(atrsV!=undefined){
                atrsVarsIds=atrsV.avVIds

            }
          
            formdata.append("productName", AdminPanelStore.getName())
            formdata.append("title",AdminPanelStore.getTitle())
            formdata.append("description", AdminPanelStore.getDescr())
            formdata.append("price", String(AdminPanelStore.getOldPrice()))
            formdata.append("sale_price", String(AdminPanelStore.getNewPrice()))
            formdata.append("categories", JSON.stringify(AdminPanelStore.getActualCategories()))
            formdata.append("tags", JSON.stringify(AdminPanelStore.getActualTagsIds()))
            formdata.append("attributes", JSON.stringify(atrsIds))
            formdata.append("vars", JSON.stringify(atrsVarsIds))
            formdata.append("recommendations", JSON.stringify(AdminPanelStore.getProductsRec().map(v=>{return v.id})))
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
        const res = await products.get(apiMap.products.getProduct + '/' + id)
        AdminPanelStore.setActualProduct(res.data)
        const product=res.data
        AdminPanelStore.setActualTags([])
        AdminPanelStore.setActualTagsIds([])
        if(product!=undefined){
          
            product['res'].productName!=undefined&&AdminPanelStore.setName(product['res'].productName)
            product['res'].title!=undefined&&AdminPanelStore.setTitle(product['res'].title)
            product['res'].description!=undefined&&AdminPanelStore.setDescr(product['res'].description)
            product['res'].price!=undefined&&AdminPanelStore.setOldPrice(product['res'].price)
            product['res']['sale_price']!=undefined&&AdminPanelStore.setNewPrice(product['res']['sale_price'])
            if(product['variations']!=undefined)
            for(let v of product['variations']['attributeValue']){
                AdminPanelStore.setActualAttrValuesIdsVarsAuto( product['variations']['id'], v['id'], product['variations']['attributeName'], v['attributeValue'])
            }
            for(let v of product['res']['tag']){
                let c=true
                for(let g of AdminPanelStore.getActualTags()){
                    if(g==v.id){
                        c=false
                    }
                }
                if(c){
                    AdminPanelStore.addActualTags(v.tagTitle)
                    AdminPanelStore.addActualTagsIds(v.id)
                    
                }
            }

            for(let v of product['cs']){
                if(AdminPanelStore.getActualCategories().length==0){
                    AdminPanelStore.addActualCategories(v.id)
                    AdminPanelStore.addGroupCategories(v['group'].groupTitle, v.categoryName)
                }
                let c=true
                for(let y of AdminPanelStore.getActualCategories()){
                    if(y==v.id){
                        c=false
                    }
                }
                if(c){
                    AdminPanelStore.addActualCategories(v.id)
                    AdminPanelStore.addGroupCategories(v['group'].groupTitle, v.categoryName)
                }
            }
            for(let v of product['ats']){
                AdminPanelStore.setActualAttrValuesIdsAuto(v['id'], v['attributeValue'][0]['id'],v['attributeName'], v['attributeValue'][0]['attributeValue'])
            }
            for(let v of product['recommendations']){
                AdminPanelStore.setProductsRec(v['id'], v['productName'], v['previews'].length>0?v['previews'][0]['title']:undefined)
            }

       
        }
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

            let atrsVarsIds: number[]=[]
            const atrsV=AdminPanelStore.getActualAttrValueVarsIds()
            if(atrsV!=undefined){
                atrsVarsIds=atrsV.avVIds

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
            formdata.append("vars", JSON.stringify(atrsVarsIds))
            formdata.append("recommendations", JSON.stringify(AdminPanelStore.getProductsRec().map(v=>{return v.id})))
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