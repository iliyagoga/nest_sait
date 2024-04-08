

import {makeAutoObservable} from 'mobx'
class AdminPanelStore{
    constructor(){
        makeAutoObservable(this)
    }
    private _tags: any[];
    private _tagTitle: string;
    private _tagPage: number =0;
    private _countTagPages:number;
    private _deletes: {id:number|null, mode: boolean}[]=[
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
    ];




    private _attributes: any[]
    private _countAttrsPages: number;
    private _deletesAttrs: {id:number|null, mode: boolean}[]=[
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
    ];
    private _attrPage: number=0;
    private _attrValues: any[];
    private _attributeId: number;
    private _createAttr: string;
    private _createAttrValue: string;
    private _attrValuePage: number = 0;
    private _attrValueCountPages: number = 0;

    private _groups: any[];
    private _groupsCountPages: any;
    private _groupPage: number = 0;
    private _groupId: number;
    private _createGroup: string;
    private _renameGroupId: number;
    private _renameGroup: string;
    private _deletesGroup: {id:number|null, mode: boolean}[]=[
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
    ];

    private _categories: any[];
    private _categoriesCountPages: any;
    private _categoryPage: number = 0;
    private _categoryId: number;
    private _createCategory: string;
    private _renameCategoryId: number;
    private _renameCategory: string;

    private _productsGroups: any[];
    private _productsCategories: any[];
    private _actualCategories: number[]=[];
    private _GroupCategories: {gV: string, cV: string}[]=[];
    private _productsTags: any[];
    private _actualTags: string[]=[];
    private _actualTagsIds: number[]=[];
    private _productsAttrs: any[];
    private _productsAttrsValue: any[];
    private _AttrsAttrsValueIds:  {aVid: number, avVIds: number[]}[]=[];
    private _AttrsAttrsValue: {aV: string, avVs: string[]}[]=[];
    private _AttrsAttrsValueVarsIds:  {aVid: number, avVIds: number[]} | undefined = undefined;
    private _AttrsAttrsValueVars: {aV: string, avVs: string[]} | undefined=undefined;
    private _imgFile: File;
    private _galleryFiles: Blob[] = [];
    private _name: string;
    private _title: string;
    private _descr: string;
    private _old_price: number  = 0;
    private _new_price: number = 0;
    private _productPage: number =0;
    private _productCountPages: number = 1;
    private _seacrh: string = "";
    private _filterPrice: string = 'null'
    private _filterDate: string = 'null'


    private _products: any[] = [];
    private _actualProductId: number;
    private _actualProduct: any[]
    private photos: any[]=[]
    private _uploadImages: any[]=[]
    private _actualImage: string;
    private _uploadGallery: {title: string, file: Blob}[]=[]
    private _createGallery: {title: string, file: Blob}[]=[]

    private _productsRec: {id: number, productName: string, preview: string}[] = [];


    private _orders: any[]
    private _countOrderPages: number;
    private _deletesOrder: {id:number|null, mode: boolean}[]=[
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
        {id: null,mode: false},
    ];
    private _orderPage: number=0;
    private _orderId: number;






    getTags(){
        return this._tags;
    }

    setTags(tags){
        this._tags= tags;
    }
    
    addTag(tag: object){
        this._tags.push(tag)
    }

    getTagTitle(){
        return this._tagTitle;
    }

    setTagTitle(tag: string){
        this._tagTitle=tag;
    }
    setTag(tag:object){

        this._tags[tag['id']]=tag
    }

    getTagPage(){
        return this._tagPage;
    }

    setTagPage(page){
        this._tagPage= page;
    }

    getCountTagPages(){
        return this._countTagPages;
    }

    setCountTagPages(pages){
        this._countTagPages= pages;
    }

    getDelete(id:number){
        return this._deletes[id];
    }
    getDeletes(){
        return this._deletes;
    }
    setDeletes(id:number, idTag: number){
        this._deletes[id].mode=!this._deletes[id].mode;
        this._deletes[id].id=idTag;
    }
    setAllDeletes(){
        this._deletes=this._deletes.map((v,i)=>{
            v.mode=true
            if(this._tags[i]!=undefined)
                v.id=this._tags[i].id
            return v;
        })
    }
    clearDeletes(){
        this._deletes=this._deletes.map(v=>{
            v.mode=false;
            v.id=null;
            return v;
        })
    }




    getAttrs(){
        return this._attributes;
    }

    setAttrs(attrs){
        this._attributes= attrs;
    }

    getAttrPage(){
        return this._attrPage;
    }

    setAttrPage(page: number){
        this._attrPage= page;
    }

    getCountAttrsPages(){
        return this._countAttrsPages;
    }

    setCountAttrsPages(pages){
        this._countAttrsPages= pages;
    }

    getCreateAttr(){
        return this._createAttr;
    }

    setCreateAttr(value: string){
        this._createAttr=value;
    }

    getAttrsValues(){
        return this._attrValues;
    }

    setAttrsValues(values: any[]){
        this._attrValues=values;
    }

    getAttributeId(){
        return this._attributeId;
    }

    setAttributeId(id: number){
        this._attributeId=id;
    }

    getCreateAttrValue(){
        return this._createAttrValue;
    }
    
    setCreateAttrValue(value: string){
        this._createAttrValue=value;
    }

    getAttrValuePage(){
        return this._attrValuePage;
    }

    setAttrValuePage(page:number){
        this._attrValuePage= page;
    }

    getAttrValueCountPages(){
        return this._attrValueCountPages;
    }

    setAttrValueCountPages(pages:number){
        this._attrValueCountPages= pages;
    }

    getDeleteAttr(id:number){
        return this._deletesAttrs[id];
    }
    getDeleteAttrs(){
        return this._deletesAttrs;
    }
    setDeleteAttrs(id:number, idTag: number){
        this._deletesAttrs[id].mode=!this._deletesAttrs[id].mode;
        this._deletesAttrs[id].id=idTag;
    }
    setAllDeleteAttrs(){
        this._deletesAttrs=this._deletesAttrs.map((v,i)=>{
            v.mode=true
            if(this._attributes[i]!=undefined)
                v.id=this._attributes[i].id
            return v;
        })
    }
    clearDeleteAttrs(){
        this._deletesAttrs=this._deletesAttrs.map(v=>{
            v.mode=false;
            v.id=null;
            return v;
        })
    }





    getGroups(){
        return this._groups;
    }

    setGroups(groups: any[]){
        this._groups=groups;

    }

    getGroupsCountPages(){
        return this._groupsCountPages;
    }

    setGroupsCountPages(pages){
        this._groupsCountPages=pages;

    }

    getGroupPage(){
        return this._groupPage;
    }

    setGroupPage(page: number){
        this._groupPage=page;

    }

    getCreateGroup(){
        return this._createGroup;
    }

    setCreateGroup(name: string){
        this._createGroup=name;

    }

    getGroupId(){
        return this._groupId;
    }

    setGroupId(id: number){
        this._groupId=id;
    }

    getRenameGroupId(){
        return this._renameGroupId;
    }

    setRenameGroupId(id: number){
        this._renameGroupId = id;
    }

    getRenameGroup(){
        return this._renameGroup;
    }

    setRenameGroup(name: string){
        this._renameGroup=name;
    }

    getDeleteGroup(id: number){
        return this._deletesGroup[id];
    }
    getDeletesGroup(){
        return this._deletesGroup;
    }
    setDeletesGroup(id:number, idGroup: number){
        this._deletesGroup[id].mode=!this._deletesGroup[id].mode;
        this._deletesGroup[id].id=idGroup;
    }
    setAllDeletesGroup(){
        this._deletesGroup=this._deletesGroup.map((v,i)=>{
            v.mode=true
            if(this._groups[i]!=undefined)
                v.id=this._groups[i].id
            return v;
        })
    }
    clearDeletesGroup(){
        this._deletesGroup=this._deletesGroup.map(v=>{
            v.mode=false;
            v.id=null;
            return v;
        })
    }

    getCategories(){
        return this._categories;
    }

    setCategories(cs: any[]){
        this._categories= cs;
    }

    getCategoriesCountPages(){
        return this._categoriesCountPages;
    }

    setCategoriesCountPages(pages){
        this._categoriesCountPages=pages;

    }

    getCategoryPage(){
        return this._categoryPage;
    }

    setCategoryPage(page: number){
        this._categoryPage=page;

    }

    getCreateCategory(){
        return this._createCategory;
    }

    setCreateCategory(name: string){
        this._createCategory=name;
    }

    getCategoryId(){
        return this._categoryId;
    }

    setCategoryId(id: number){
        this._categoryId=id;
    }

    getRenameCategoryId(){
        return this._renameCategoryId
    }

    setRenameCategoryId(id: number){
        this._renameCategoryId = id;
    }

    getRenameCategory(){
        return this._renameCategory
    }

    setRenameCategory(name: string){
        this._renameCategory= name;
    }

    getProductGroups(){
        return this._productsGroups;
    }

    setProductGroups(pr: any[]){
        this._productsGroups= pr;
    }

    getProductCategories(){
        return this._productsCategories;
    }

    setProductCategories(pr: any[]){
        this._productsCategories= pr;
    }

    getActualCategories(){
        return this._actualCategories;
    }

    addActualCategories(value: number){
        this._actualCategories.push(value)
    }
    setActualCategories(arr: any[]){
        this._actualCategories = arr;
    }

    getGroupCategories(){
        return this._GroupCategories;
    }

    addGroupCategories(gV: string, cV:string){
        this._GroupCategories.push({gV, cV})
    }

    setGroupCategories(arr: any[]){
        this._GroupCategories = arr;
    }

    getProductsTags(){
        return this._productsTags;
    }

    setProductsTags(arr: any[]){
        this._productsTags=arr;
    }

    setActualTags(arr: string[]){
        this._actualTags=arr;
    }

    addActualTags(value: string){
        this._actualTags.push(value);
    }

    getActualTags(){
        return this._actualTags;
    }

    setActualTagsIds(arr: number[]){
        this._actualTagsIds=arr;
    }

    addActualTagsIds(value: number){
        this._actualTagsIds.push(value);
    }

    getActualTagsIds(){
        return this._actualTagsIds;
    }

    getProductsAttrs(){
        return this._productsAttrs;
    }

    setProductsAttrs(arr: any[]){
        this._productsAttrs=arr;
    }

    getProductsAttrsValues(){
        return this._productsAttrsValue;
    }

    setProductsAttrsValues(arr: any[]){
        this._productsAttrsValue=arr;
    }




    getActualAttrValuesIds(){
        return this._AttrsAttrsValueIds;
    }
    findActualAttrValuesIds(idA:number, idAv: number ){
        let c=false
        let y=false
        for(let i=0; i<this._AttrsAttrsValueIds.length; i++){
            if(this._AttrsAttrsValueIds[i].aVid==idA){
                c=true
            }
        }
        if(c){
          
            for(let i=0; i<this._AttrsAttrsValueIds.length; i++){
                if(this._AttrsAttrsValueIds[i].aVid==idA){
                    for(let j of this._AttrsAttrsValueIds[i].avVIds){
                        if(j==idAv){
                            y=true
                            
                        }
                    }
                    
                }
            }
        }
        else{
            return false
        }
        return y
    }

    setActualAttrValuesIds(idA:number, idAv: number,a: string, av:string){
        let c=false
        for(let i of this._AttrsAttrsValueIds){
            if(i.aVid==idA){
                c=true
            }
        }
        if(c){
            for(let i of this._AttrsAttrsValueIds){
                if(i.aVid==idA){
                    let y=false
                    for(let j of i.avVIds){
                        if(j==idAv){
                            y=true
                        }
                    }
                    let ind= this._AttrsAttrsValueIds.indexOf(i)
                    if(y){
                        if(i.avVIds.length==1){
                            
                            if(ind==0){
                                this._AttrsAttrsValue.shift()
                                this._AttrsAttrsValueIds.shift()
                                break;
                          
                            }
                            if(ind==this._AttrsAttrsValueIds.length-1){
                                this._AttrsAttrsValueIds.pop()
                                this._AttrsAttrsValue.pop()
                            }
                            else{
                                this._AttrsAttrsValueIds=[...this._AttrsAttrsValueIds.slice(0,ind),...this._AttrsAttrsValueIds.slice(ind)]
                                this._AttrsAttrsValue=[...this._AttrsAttrsValue.slice(0,ind),...this._AttrsAttrsValue.slice(ind)]
                            }

                           
                        }
                        else{

                            if(i.avVIds.indexOf(idAv)==0){
                                i.avVIds.shift()
                                this._AttrsAttrsValue[ind].avVs.shift()
                            }
                            if(i.avVIds.indexOf(idAv)==i.avVIds.length-1){
                                i.avVIds.pop()
                                this._AttrsAttrsValue[ind].avVs.pop()
                            }
                            else{
                                
                                i.avVIds=[...i.avVIds.slice(0, i.avVIds.indexOf(idAv)),...i.avVIds.slice( i.avVIds.indexOf(idAv))]
                                this._AttrsAttrsValue[ind].avVs=[...this._AttrsAttrsValue[ind].avVs.slice(0, this._AttrsAttrsValue[ind].avVs.indexOf(a)),...this._AttrsAttrsValue[ind].avVs.slice( this._AttrsAttrsValue[ind].avVs.indexOf(a))]
                            }
                        }
                        

                    }
                    else{
                        i.avVIds.push(idAv)
                        this._AttrsAttrsValue[ind].avVs.push(av)

                    }
                    
                }
            }
        }
        else{
            this._AttrsAttrsValueIds.push({aVid: idA, avVIds: [idAv]})
            this._AttrsAttrsValue.push({aV:a, avVs: [av]})
        }
       
    }

    setActualAttrValuesIdsAuto(idA:number, idAv: number,a: string, av:string){
        let c=false
        for(let i of this._AttrsAttrsValueIds){
            if(i.aVid==idA){
                c=true
            }
        }
        if(c){
            for(let i of this._AttrsAttrsValueIds){
                if(i.aVid==idA){
                    let y=false
                    for(let j of i.avVIds){
                        if(j==idAv){
                            y=true
                        }
                    }
                    let ind= this._AttrsAttrsValueIds.indexOf(i)
                    if(!y){
                        i.avVIds.push(idAv)
                        this._AttrsAttrsValue[ind].avVs.push(av)

                    }
                    
                }
            }
        }
        else{
            this._AttrsAttrsValueIds.push({aVid: idA, avVIds: [idAv]})
            this._AttrsAttrsValue.push({aV:a, avVs: [av]})
        }
       
    }


    setAttrAttrsValues(arr: any[]){
        this._AttrsAttrsValue=arr;
    }

    getAttrAttrsValues(){
        return this._AttrsAttrsValue;
    }









    getActualAttrValueVarsIds(){
        return this._AttrsAttrsValueVarsIds;
    }
    findActualAttrValuesVarsIds(idAv: number ){
        let c=false
        let y=false
        if(this._AttrsAttrsValueVarsIds!=undefined){
            for(let i of this._AttrsAttrsValueVarsIds.avVIds){
                if(i==idAv){
                    return true
                }
            }
        }
     
        return y
    }
    clearActualAttrValuesVarsIds(){
        this._AttrsAttrsValueVars = undefined;
        this._AttrsAttrsValueVarsIds = undefined;
    }

    setActualAttrValuesVarsIds(idA:number, idAv: number,a: string, av:string){
        let c=false
        if(this._AttrsAttrsValueVarsIds==undefined || this._AttrsAttrsValueVars == undefined){
            this._AttrsAttrsValueVarsIds = {aVid: idA, avVIds: [idAv]}
            this._AttrsAttrsValueVars = {aV:a, avVs: [av]}
        }
        else{
            let i = this._AttrsAttrsValueVarsIds
            let y=false
            for(let j of i.avVIds){
                if(j==idAv){
                    y=true
                }
            }
            if(this._AttrsAttrsValueVarsIds.aVid==idA){
                if(y){
                    if(i.avVIds.length==1){
                        this._AttrsAttrsValueVars = undefined;
                        this._AttrsAttrsValueVarsIds = undefined;
                               
                    }
                    else{
                        
                        if(i.avVIds.indexOf(idAv)==0){
                            i.avVIds.shift()
                            this._AttrsAttrsValueVars.avVs.shift()
                        }
                        else
                        if(i.avVIds.indexOf(idAv)==i.avVIds.length-1){
                            i.avVIds.pop()
                            this._AttrsAttrsValueVars.avVs.pop()
                        }
                        else{
                            this._AttrsAttrsValueVars.avVs=[...this._AttrsAttrsValueVars.avVs.slice(0, i.avVIds.indexOf(idAv)),...this._AttrsAttrsValueVars.avVs.slice(i.avVIds.indexOf(idAv)+1)]
                            i.avVIds=[...i.avVIds.slice(0, i.avVIds.indexOf(idAv)),...i.avVIds.slice( i.avVIds.indexOf(idAv)+1)]
    
                        }
                        
                    }
                    
    
                }
                else{
                    i.avVIds.push(idAv)
                    this._AttrsAttrsValueVars.avVs.push(av)
    
    
                }
            }
            else{
                throw new Error('Удалите уже выбранную вариацию, прежде чем выбирать новую')
            }
          
                    
            }
        
    }


       
    

    setActualAttrValuesIdsVarsAuto(idA:number, idAv: number,a: string, av:string){

        if( this._AttrsAttrsValueVarsIds==undefined){
            this._AttrsAttrsValueVarsIds={aVid: idA, avVIds: [idAv]}
            this._AttrsAttrsValueVars={aV:a, avVs: [av]}
        }
        else{
            this.setActualAttrValuesVarsIds(idA,idAv,a,av)
        }
        
      
       
    }


    setAttrAttrsValuesVars(aV: string, avVs: string[]){
        this._AttrsAttrsValueVars= {aV,avVs};
    }

    getAttrAttrsValuesVars(){
        return this._AttrsAttrsValueVars;
    }












    

    setImgFile(file: any){
        this._imgFile=file;
    }

    getImgFile(){
        return this._imgFile;
    }

    getGallery(){
        return this._galleryFiles;
    }

    addFileGallery(file: any){
        this._galleryFiles.push(file);
    }

    deleteFileGallery(file : any){
        for(let i=0; i<this._galleryFiles.length;i++){
            if(this._galleryFiles[i].size==file.size && this._galleryFiles[i].type==file.type){
                if(i==0){
                    this._galleryFiles.shift()
                }
                else{
                    if(i==this._galleryFiles.length-1){
                        this._galleryFiles.pop()
                    }
                    else
                    this._galleryFiles=[...this._galleryFiles.slice(0,i),...this._galleryFiles.slice(i)];
                }
               
                break;
            }

           
        }
    }

    getProductPage(){
        return this._productPage;
    }

    setProductPage(page: number){
        this._productPage=page;
    }

    getProductCountPages(){
        return this._productCountPages;
    }

    setProductCountPages(pages: number){
        this._productCountPages=pages;
    }

    getName(){
        return this._name;
    }

    setName(name: string){
        this._name=name;
    }

    getTitle(){
        return this._title;
    }

    setTitle(title: string){
        this._title=title;
    }

    getDescr(){
        return this._descr;
    }

    setDescr(descr: string){
        this._descr = descr;
    }

    getOldPrice(){
        return this._old_price;
    }

    setOldPrice(price: number){
        this._old_price = price;
    }

    getNewPrice(){
        return this._new_price;
    }

    setNewPrice(price: number){
        this._new_price = price;
    }

    getProducts(){
        return this._products;
    }

    setProducts(products: any[]){
        this._products = products;
    }

    getActualProductId(){
        return this._actualProductId;
    }

    setActualProductId(productId: number){
        this._actualProductId = productId;
    }

    getActualProduct(){
        return this._actualProduct;
    }

    setActualProduct(product: any[]){
        this._actualProduct = product;
    }

    getPhotos(){
        return this.photos;
    }

    setPhotos(arr: any[]){
        this.photos=arr;
    }

    getUploadImages(){
        return this._uploadImages;
    }

    setUploadImages(elem: string){
        this._uploadImages.push(elem);
    }

    deleteUploadImages(elem: string){
        for(let i=0; i<this._uploadImages.length;i++){
            if(this._uploadImages[i]==elem){
                if(i==0){
                    this._uploadImages.shift()
                }
                else{
                    if(i==this._uploadImages.length-1){
                        this._uploadImages.pop()
                    }
                    else{
                        this._uploadImages=[...this._uploadImages.slice(0,i),...this._uploadImages.slice(i+1)];
                    }
            
                }
               
                break;
            }

           
        }
    }

    getCreateGallery(){
        return this._createGallery;
    }

    setCreateGallery(title: string, file: Blob){
        this._createGallery.push({title,file});
    }

    deleteCreateGallery(elem: string){
        for(let i=0; i<this._createGallery.length;i++){
            if(this._createGallery[i].title==elem){
                if(i==0){
                    this._createGallery.shift()
                }
                else{
                    if(i==this._createGallery.length-1){
                        this._createGallery.pop()
                    }
                    else{
                        this._createGallery=[...this._createGallery.slice(0,i),...this._createGallery.slice(i+1)];
                    }
            
                }
               
                break;
            }

           
        }
    }







    getUploadGallery(){
        return this._uploadGallery;
    }

    setUploadGallery(title: string, file: Blob){
        this._uploadGallery.push({title, file});
    }

    deleteUploadGallery(elem: string){
        for(let i=0; i<this._uploadGallery.length;i++){
            if(this._uploadGallery[i].title==elem){
                if(i==0){
                    this._uploadGallery.shift()
                }
                else{
                    if(i==this._uploadGallery.length-1){
                        this._uploadGallery.pop()
                    }
                    else{
                        this._uploadGallery=[...this._uploadGallery.slice(0,i),...this._uploadGallery.slice(i+1)];
                    }
            
                }
               
                break;
            }

           
        }
    }

    getSearch(){
        return this._seacrh;
    }

    setSearch(str: string){
        this._seacrh=str;
    }

    setFilterPrice(price: string){
        this._filterPrice=price;
    }
    
    getFilterPrice(){
        return this._filterPrice;
    }

    setFilterDate(date: string){
        this._filterDate=date;
    }
    
    getFilterDate(){
        return this._filterDate;
    }

    getProductsRec(){
        return this._productsRec;
    }

    setProductsRec(id: number, productName: string, preview: string){
        let c=false
        for(let i= 0; i< this._productsRec.length; i++){
            if(this._productsRec[i].id==id){
                c=true;
                if(i==0){
                    this._productsRec.shift();
                }
                else
                if(i==this._productsRec.length-1){
                    this._productsRec.pop();
                }
                else
                this._productsRec=[...this._productsRec.slice(0,i),...this._productsRec.slice(i+1)];
                
            }
        }
        if(!c){
            this._productsRec.push({id, productName, preview})
        }
    }

    findProductsRec(id: number ){
        for(let p of this._productsRec){
            if(p.id==id){
                return true;
            }
        }
        return false
    }

    getOrders(){
        return this._orders;
    }

    setOrders(orders){
        this._orders= orders;
    }

    getOrderPage(){
        return this._orderPage;
    }

    setOrderPage(page: number){
        this._orderPage= page;
    }

    getCountOrderPages(){
        return this._countOrderPages;
    }

    setCountOrdersPages(pages){
        this._countOrderPages= pages;
    }

    getOrderId(){
        return this._orderId;
    }

    setOrderId(id: number){
        this._orderId=id;
    }

    getDeleteOrder(id:number){
        return this._deletesOrder[id];
    }
    getDeleteOrders(){
        return this._deletesOrder;
    }
    setDeleteOrders(id:number, idOrder: number){
        this._deletesOrder[id].mode=!this._deletesOrder[id].mode;
        this._deletesOrder[id].id=idOrder;
    }
    setAllDeleteOrders(){
        this._deletesOrder=this._deletesOrder.map((v,i)=>{
            v.mode=true
            if(this._orders[i]!=undefined)
                v.id=this._orders[i].id
            return v;
        })
    }
    clearDeleteOrders(){
        this._deletesOrder=this._deletesOrder.map(v=>{
            v.mode=false;
            v.id=null;
            return v;
        })
    }






}
export default new AdminPanelStore()

