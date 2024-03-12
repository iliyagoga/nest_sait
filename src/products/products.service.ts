import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attribute } from './attributes.model';
import { AttributeDto } from './dto/attribute.dto';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.model';
import { AttributeValue } from './AttributeValuea.model';
import { AttributeValueDto } from './dto/attributeValue.dto';
import { CategoryProduct } from 'src/filters/CategoryProduct.model';
import { AttributeProduct } from './AttributeProduct.model';
import { Tag } from 'src/filters/tag.model';
import { TagProduct } from 'src/filters/TagProduct.model';
import { RedactProductDto } from './dto/redact-product.dto';
import { GetProduct } from './dto/getProduct.dto';
import { Op } from 'sequelize';
import { Category } from 'src/filters/category.model';
import { RenameAttributeValue } from './dto/rename-attributeValue.dto';
import { FilesService } from 'src/files/files.service';
import { Gallery } from './gallery.model';
import { Previews } from './preview.model';
import { Group } from 'src/filters/group.model';
import { Where } from 'sequelize/types/utils';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Attribute) private attr: typeof Attribute,
    @InjectModel(Product) private product: typeof Product,
    @InjectModel(AttributeValue) private attrValue: typeof AttributeValue,
    @InjectModel(AttributeProduct) private attrProduct: typeof AttributeProduct,
    @InjectModel(CategoryProduct) private cat_pr: typeof CategoryProduct,
    @InjectModel(TagProduct) private tagProduct: typeof TagProduct,
    @InjectModel(Tag) private tag: typeof Tag,
    @InjectModel(Category) private cats: typeof Category,
    @InjectModel(Gallery) private gallery: typeof Gallery,
    @InjectModel(Previews) private preview: typeof Previews,
    @InjectModel(Group) private group: typeof Group,
    private fileService: FilesService

     ){}

    async createAttribute(dto: AttributeDto){
        const attribute= await this.attr.findOne({where:{attributeName: dto.attributeName}});
        if(!attribute){
            return await this.attr.create(dto)
        }
        throw new HttpException("Аттрибут с таким названием уже есть",HttpStatus.BAD_REQUEST)
    }

    async renameAttribute(dto: RenameAttributeValue){
        try {
            return await this.attr.update(
                {
                    attributeName: dto.attributeValue
                },{
                    where: {
                        id: dto.attributeValueId
                    }
                })
        } catch (error) {
            throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
        }
    }
    
    async deleteAttribute(id: number[]){
        const attribute= await this.attr.findOne(
            {
                where:{
                    id: {[Op.or]: id}
                }
            }
            );
        if(attribute){
            await this.attrValue.destroy({where:{attributeId:id}})
            return await this.attr.destroy({where:{id}})
        }
        else 
        {
            throw new HttpException("Такого аттрибута нет", HttpStatus.BAD_REQUEST)
        }
    }
    
    async createAttributeValue(dto: AttributeValueDto){
        try {
            return await this.attrValue.create({attributeValue: dto.attributeValue, attributeId: dto.attributeId})
        } catch (error) {
            throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
        }
    }
    async renameAttributeValue(dto: RenameAttributeValue){
        try {
            return await this.attrValue.update(
                {
                    attributeValue: dto.attributeValue
                },{
                    where: {
                        id: dto.attributeValueId
                    }
                })
        } catch (error) {
            throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
        }
    }
    async deleteAttributeValue(id: number){
        const attrVal= await this.attrValue.findOne({where:{id}});
        if(attrVal){
            return await this.attrValue.destroy({where:{id}})
        }
        else 
        {
            throw new HttpException("Такого значения аттрибута нет", HttpStatus.BAD_REQUEST)
        }
    }

    async getProductCountPages(pars: string[]){
        const limit= pars['limit']
            let count=0;
            let price=null
            if(pars['search'] == 'null'){
                if(pars['price']=='desc'){
                    price='desc'
                }
                else{
                    if(pars['price']=='asc')
                        price='asc'
                    else
                        price=null
                }
                let rating=null
                if(pars['rating']=='desc'){
                    rating='desc'
                }
                else{
                    if(pars['rating']=='asc')
                        rating='asc'
                    else
                        rating=null
                }
                if(rating && !price){
                    count= await this.product.count({
                        include:{
                            model: Previews,
                            attributes:['title']
                        }
                    })
                }
                if(!rating && price){
                    count= await this.product.count({
                        include:{
                            model: Previews,
                            attributes:['title']
                        }
                    })
                }
                if(rating && price){
                    count= await this.product.count({
                        include:{
                            model: Previews,
                            attributes:['title']
                        }
                    })
                }   
                count= await this.product.count({
                    include:{
                        model: Previews,
                        attributes:['title']
                    },
                })
                return Math.floor(count/limit)+1
            }
            else{
                let search= pars['search']
                if(search[0]=="$"){
                    let copy: string =search;
                    let sArr: string[] =copy.split('');
                    sArr.shift();
                    let str: string = sArr.join("");
        
                    
                    const products= await this.product.count({
                        include:[{
                            model:Tag,
                            where:{
                                tagTitle:{
                                    [Op.startsWith]: str
                                }
                                
                            },
                            
                        },
                            {
                                model: Previews
                            }]
                    })
                    return Math.floor(products/limit)+1;
                }
                else{
                    const products= await this.product.count({
                        where:{ productName:{
                            [Op.startsWith]: search
                        }
                            
                        },
                        include: {
                            model: Previews
                        }
                    }
                        
                    )
                    return Math.floor(products/limit)+1;
                }
            }
            
    }

    async createProduct(dto: ProductDto,images: Blob[]){
        try {
            const product =await this.product.create(dto);
            if(images.length>0){
                const mean_img= await this.fileService.createFile(images[0]);
                const preview = await this.preview.create({title: mean_img, productId: product.id})
            
            }
    
            if(JSON.parse(dto.categories).length>0){
                for(const cat of JSON.parse(dto.categories)){
                    await this.cat_pr.create({productId:product.id, categoryId:cat})
                }
            }
            if(JSON.parse(dto.attributes).length>0){
                for(const attr of JSON.parse(dto.attributes)){
                    await this.attrProduct.create({productId:product.id, attributeValueId: attr})
                }
            }
    

            if(JSON.parse(dto.tags).length>0){
                for(const t of JSON.parse(dto.tags)){
                await  this.tagProduct.create({tagId:t, productId: product.id})
                }
            }
            return product;
        } catch (error) {
            throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
        }
       
    }
    async createGalleryProduct(images: Blob[],dto){
        for (let i = 0; i < images.length; i++) {
            const imgTitle= await this.fileService.createFile(images[i]);
            const img = await this.gallery.create({title: imgTitle, productId: dto['id']})
        }
    }

    async redactProduct(dto: object, images: Blob[]){
        const product = await this.product.findOne({
            where:{id: dto['id']},
            include:[
                {model: Previews}
            ]
        })
        if(product){
            if(images.length>0){
                if(product.previews.length==0 && dto['previews'].length!=0){
                    const mean_img= await this.fileService.createFile(images[0]);
                    const preview = await this.preview.create({title: mean_img, productId: product.id})
                }
                else{
                    if(product.previews.length==1){
                        if(product.previews[0].title!=dto['previews']){
                            const mean_img= await this.fileService.createFile(images[0]);
                            const preview = await this.preview.update({title: mean_img}, {where:{productId: product.id}})
                   
                        }
                    }
                }
            }
            const r= await this.product.update({
                productName: dto['productName'],
                title: dto['title'],
                description: dto['description'],
                price: dto['price'],
                sale_price: dto['sale_price'],
    

            },{where: {id: dto['id']}})
            if(dto['categories']!=undefined){
                await this.cat_pr.destroy({where: {productId:product.id}})
                for(const cat of JSON.parse(dto['categories'])){
                    try {
                        
                        await this.cat_pr.create({productId:product.id, categoryId:cat})
                    } catch (error) {
                        throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
                        
                    }
                  
                }
            }
            if(dto['attributes']!=undefined){
                await this.attrProduct.destroy({where: {productId:product.id}})
                for(const attr of JSON.parse(dto['attributes'])){
                    try {
                        await this.attrProduct.create({productId:product.id, attributeValueId: attr})
                    } catch (error) {
                        throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
                    }
                  
                }
            }
    
            if(dto['tags']!=undefined){
                await this.tagProduct.destroy({where: {productId:product.id}})
                for(const t of JSON.parse(dto['tags'])){
                    try {
                        await this.tagProduct.create({tagId:t, productId: product.id})
                    } catch (error) {
                        throw new HttpException(error.name,HttpStatus.BAD_REQUEST)
                    }
                  
                }
            }
            return true
        }
        throw new HttpException("Такого товара не сущетсвует", HttpStatus.BAD_REQUEST)

    }

    async updateGalleryProduct(images: Blob[], dto: object){
        const product = await this.product.findOne({
            where:{id: Number(dto['id'])},
            include:[
                {model: Gallery}
            ]
        })

        if(images.length==0){
            if(product.gallery.length>JSON.parse(dto['gallery']).length){
               const data=JSON.parse(dto['gallery']).map(v=>{return v.split('/')[3]})
                await this.gallery.destroy({where: {
                    title:{
                        [Op.notIn]: data
                    },
                    productId: product.id
                    
                }})

            }
        }
        else{
            const def=[]
            let c=0
            for(let elem of JSON.parse(dto['gallery'])){
                const t= elem.split(':')
                
                if(t[0]!='blob'){
                    def.push(t[2].split('/')[1])
                 
                }
            }
            await this.gallery.destroy({where: {
                title:{
                    [Op.notIn]: def
                },
                productId: product.id
                
            }})

            for(let elem of JSON.parse(dto['gallery'])){
                const t= elem.split(':')
                
                if(t[0]=='blob' && t[1]=='http' && t[2]=='//localhost'){
                    const mean_img= await this.fileService.createFile(images[c]);
                    const preview = await this.gallery.create({title: mean_img ,productId: product.id})
                c++;
                }
            
        }
        }
         return true
        
    }

    async deleteProduct(id: number){
        const product = await this.product.findOne({where:{id}})
        if(product){
            await this.tagProduct.destroy({
                where:{
                    productId:id
                }
            })
            await this.cat_pr.destroy({
                where:{
                    productId:id
                }
            })
            await this.attrProduct.destroy({
                where:{
                    productId:id
                }
            })
            await this.gallery.destroy({
                where:{
                    productId:id
                }
            })
            await this.preview.destroy({
                where:{
                    productId:id
                }
            })
            await this.product.destroy({where:{id}})
            return true;
        }
        else{
            throw new HttpException("Такого товара не существует", HttpStatus.BAD_REQUEST)
        }
       

    }

    async getProducts(pars: string[]){
            const page= Number(pars['page']);
            const limit= Number(pars['limit']);
            let price=null
            if(pars['search'] == 'null'){
                if(pars['price']=='desc'){
                    price='desc'
                }
                else{
                    if(pars['price']=='asc')
                        price='asc'
                    else
                        price=null
                }
                let rating=null
                if(pars['rating']=='desc'){
                    rating='desc'
                }
                else{
                    if(pars['rating']=='asc')
                        rating='asc'
                    else
                        rating=null
                }
                if(rating && !price){
                    return await this.product.findAll({
                        offset: limit*page,
                        limit,
                        order:[
                            ['rating', rating]
                        ],
                        include:{
                            model: Previews,
                            attributes:['title']
                        }
                    })
                }
                if(!rating && price){
                    return await this.product.findAll({
                        offset: limit*page,
                        limit,
                        order:[
                            ['price', price]
                        ],
                        include:{
                            model: Previews,
                            attributes:['title']
                        }
                    })
                }
                if(rating && price){
                    return await this.product.findAll({
                        offset: limit*page,
                        limit,
                        order:[
                            ['price', price],
                            ['rating', rating]
                          
                        ],
                        include:{
                            model: Previews,
                            attributes:['title']
                        }
                    })
                }   
                return await this.product.findAll({
                    offset: limit*page,
                    limit,
                    include:{
                        model: Previews,
                        attributes:['title']
                    },
                    order:[
                        ['id','desc']
                    ]
                })
            }
            else{
                let search= pars['search']
                if(search[0]=="$"){
                    let copy: string =search;
                    let sArr: string[] =copy.split('');
                    sArr.shift();
                    let str: string = sArr.join("");
        
                    
                    const products= await this.product.findAll({
                        include:[{
                            model:Tag,
                            where:{
                                tagTitle:{
                                    [Op.startsWith]: str
                                }
                                
                            },
                            
                        },
                            {
                                model: Previews
                            }],
                        order: [['id','desc']]
                    })
                    return products;
                }
                else{
                    const products= await this.product.findAll({
                        where:{ productName:{
                            [Op.startsWith]: search
                        }
                            
                        },
                        order: [['id','desc']],
                        include: {
                            model: Previews
                        }
                    }
                        
                    )
                    return products;
                }
            }
            

               
    }

    async getProduct(id: number){
        try {
            const res = await this.product.findOne({
                where:{
                    id
                },
                include:[
                    {model:Tag},
                    {model:Previews},
                    {model: Gallery}
                ]
           
            })
            const u= await this.cats.findAll({
                attributes:['id'],
               
                include:[
                    {model:Product,
                    where: {id}}
                    
                ]
            })
            const u2= await this.attrValue.findAll({
                attributes:['id'],
               
                include:[
                    {model:Product,
                    where: {id}}
                    
                ]
            })
            const cs = await this.cats.findAll({
                where:{id:u.map(v=>{return v.id})},
                include:[
                    {model: Group}
                ]
            }) 
            const ats = await this.attr.findAll({
                where:{id:u2.map(v=>{return v.id})},
                include:[
                    {model: AttributeValue}
                ]
            }) 
            return {res,cs,ats};
        } catch (error) {
            throw error;
        }
    }

    async getPhotos(){
        return await this.gallery.findAll({attributes:['title']})
    }


    async getAttributes(page:number,limit: number=6){
        return this.attr.findAll({
            limit,
            offset: page*limit
        });
    }

    async getCountAttributesPages(){
        return Math.floor((await this.attr.count()/6))+1
    }

    async getAttributesValues(id:number,page: number, limit: number = 6){
        return this.attrValue.findAll({
            where: {
                attributeId: id
            },
            limit,
            offset: page*limit,
            order: [['id','desc']]
        });
    }

    async getCountAttributeValuesPages(attributeId:number){
        return Math.floor((await this.attrValue.count({where:{attributeId}})/6))+1
    }

    async getProductsCats(params: string[]){
       try {
        let orders=[]
        if(params['price']=='asc'){
            orders.push(['price', 'asc'])
        }
        if(params['price']=='desc'){
            orders.push(['price', 'desc'])
        }
        if(params['rating']=='asc'){
            orders.push(['rating', 'asc'])
        }
        if(params['rating']=='desc'){
            orders.push(['rating', 'desc'])
        }
        if(params['order']=='asc'){
            orders.push(['id', 'asc'])
        }
        if(params['order']=='desc'){
            orders.push(['id', 'desc'])
        }

        const res = await this.product.findAll({
            offset: Number(params['offset']),
            limit: Number(params['limit']),
            include:[
                {model: Previews},
                {model: Gallery},
                {
                model: Category,
                where: {
                    id: Number(params['idCategory'])
                }
                }
            ],
            order: orders
            
        })
        return res
       } catch (error) {
        throw error;
       }
    }

    async getProductsDef(params: string[]){
        try {
         let orders=[]
         if(params['price']=='asc'){
             orders.push(['price', 'asc'])
         }
         if(params['price']=='desc'){
             orders.push(['price', 'desc'])
         }
         if(params['rating']=='asc'){
             orders.push(['rating', 'asc'])
         }
         if(params['rating']=='desc'){
             orders.push(['rating', 'desc'])
         }
         if(params['order']=='asc'){
             orders.push(['id', 'asc'])
         }
         if(params['order']=='desc'){
             orders.push(['id', 'desc'])
         }
 
         const res = await this.product.findAll({
             offset: Number(params['offset']),
             limit: Number(params['limit']),
             order: orders,
             include:[
                {model: Previews},
                {model: Gallery}
             ]
             
         })
         return res
        } catch (error) {
         throw error;
        }
     }
 



    
}
