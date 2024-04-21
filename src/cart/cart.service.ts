import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/addToCart.dto';
import { Cart } from './cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import sequelize from 'sequelize';
import { Product } from 'src/products/product.model';
import { JwtService } from '@nestjs/jwt';
import { Previews } from 'src/products/preview.model';
import { Variations } from 'src/products/variations.model';
import { Attribute } from 'src/products/attributes.model';
import { AttributeValue } from 'src/products/AttributeValuea.model';
import { Coupon } from 'src/coupon/coupon.model';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)  private cartRepository: typeof Cart,
        @InjectModel( Product) private productRepositury: typeof Product,
        @InjectModel( Variations) private varsRepositury: typeof Variations,
        @InjectModel(Attribute)  private attrRepository: typeof Attribute,
        @InjectModel(Coupon)  private couponRepository: typeof Coupon,
        private jwt: JwtService,

        ){}
    
    async getCart(hs: string){
        const token = this.jwt.decode(hs.split(' ')[1])
        try {
            const res = await this.productRepositury.sequelize.query(`(
            select "Products"."id" as "productId", 
            "Products"."productName" as "productName", 
            "Products"."price" as "productPrice",
            "Products"."sale_price" as "productSalePrice",
            "Products"."createdAt" as "createdAt",
            "Previews"."title" as "previewTitle",
            "Carts"."id" as "cartId",
            "Carts"."userId" as "cartUserId",
            "Carts"."productId" as "cartProductId",
            "Carts"."varId" as "cartVarId",
            "Carts"."count" as "count",
            "AtrributeValue"."id" as "attrValId",
            "AtrributeValue"."attributeValue" as "attributeValue"


            from "Products" left join "Previews" on "Previews"."productId" = "Products"."id" inner join "Carts" on "Products"."id" = "Carts"."productId" 
            left join "Variations" on "Variations"."id" = "Carts"."varId" left join "AtrributeValue" on "Variations"."attributeValueId" = "AtrributeValue"."id" where "Carts"."userId"=
            `+token.id+` order by "Products"."id" desc)`)
            
            const attrs=await this.attrRepository.sequelize.query(`(
                select "AtrributeValue"."id" as "id", 
                "AtrributeValue"."attributeValue",
                "Variations"."productId" as "productId",
                "Variations"."attributeValueId" as "attributeValueId",
                "Variations"."id" as "varId"
                from "AtrributeValue" inner join "Variations" on "AtrributeValue"."id" = "Variations"."attributeValueId" order by "id"
            )`)
            return {res,attrs};
        } catch (error) {
            throw error;
        }
    }


    async addToCart(dto: AddToCartDto, hs: string){
        try {
            const pr= await this.varsRepositury.findOne({where:{productId: dto.productId}})
            const token = this.jwt.decode(hs.split(' ')[1])
            if(pr){
                console.log(dto)
                if(dto.varId){
                    const r =await this.cartRepository.findOne({
                        where:{
                            productId: dto.productId,
                            userId: token.id,
                            varId: dto.varId
                        }
                    })
                    if(r){
                        throw new HttpException("Вы уже добавили данный товар в корзину", HttpStatus.BAD_REQUEST)
                    }
                    return await this.cartRepository.create({
                        productId: dto.productId,
                        userId: token.id,
                        varId: dto.varId,
                        count: dto.count
        
                    })
                }
                else{
                    throw new HttpException("Выберите атрибут товара", HttpStatus.BAD_REQUEST)
                }
            }
            else{
                const r =await this.cartRepository.findOne({
                    where:{
                        productId: dto.productId,
                        userId: token.id,
                    }
                })
                if(r){
                    throw new HttpException("Вы уже добавили данный товар в корзину", HttpStatus.BAD_REQUEST)
                }
                return await this.cartRepository.create({
                    productId: dto.productId,
                    userId: token.id,
                    count: dto.count
    
                })
                
                
            }
            
        } catch (error) {
            throw error;
        }

    }

    async removeFromCart(dto:RemoveFromCartDto){
        try {
            return await this.cartRepository.destroy({where:{...dto}})
        } catch (error) {
            throw error;
        }


    }

    async plusCount(productId: number, varId: number, hs: string){
        try {
            const token = this.jwt.decode(hs.split(' ')[1])
            const product= await this.cartRepository.findOne({
                where:{
                    productId: productId,
                    varId: varId,
                    userId: token['id']
                }
            })
            return await this.cartRepository.update({count:product.count+1},{where:{
                productId: productId,
                varId: varId
            }})
        } catch (error) {
            throw error;
        }
    
    }

    
    async minusCount(productId: number, varId: number, hs: string){
    try {
        const token = this.jwt.decode(hs.split(' ')[1])
        const product= await this.cartRepository.findOne({
            where:{
                productId: productId,
                varId: varId,
                userId: token['id']
            }
        })
        if(product.count>1){
            return await this.cartRepository.update({count:product.count-1},{where:{
                productId: productId,
                varId: varId
            }})
        }
        else{
            throw new HttpException("Ошибка", HttpStatus.BAD_REQUEST)
        }
    } catch (error) {
        throw error;
    }
    
    }

    async countAll(hs: string){
        try {
            const token = this.jwt.decode(hs.split(' ')[1])
            let sum=0;
            let cart= await this.productRepositury.count(
                {
                    include:{
                        model: Cart,
                        
                        where:{userId: token['id']}
        
                    }
            })
          
         return cart;
        } catch (error) {
            throw error;
        }
    

        
    }

    async sum(auth: string){
        let sum=0;
        const {res,attrs} = await this.getCart(auth)
        res.map(v=>{
            if(Number(v['sale_price']>0)){
                sum+=v['sale_price']*v['cart'][0].count;
            }
            else{
                sum+=v['price']*v['cart'][0].count;
            }
        })
        return sum;


    }

    async getCoupon(coupon: string, auth: string){
        const res = await this.couponRepository.findOne({
            where:{
                couponTitle: coupon
            }
        })
      
        if (res){
            if(await this.sum(auth)>=Number(res.couponValue)){
                return {value: res.couponValue, id: res.id}
            }
            return  {value:0, id: null}
            
        }
        return  {value:0, id: null}
    }

    async changeVars(productId: number, varId: number, newVarId: number, hs: string){
        try {
            if(newVarId!=null){
                const token = this.jwt.decode(hs.split(' ')[1])
                const res= await this.cartRepository.update({varId: newVarId}, {where:{userId: token.id, productId, varId}})
                return res
            }
            throw new HttpException("Выберите вариацию", HttpStatus.BAD_REQUEST)
          
        } catch (error) {
            throw error;
        }

    }
}
