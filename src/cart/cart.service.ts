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

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)  private cartRepository: typeof Cart,
        @InjectModel( Product) private productRepositury: typeof Product,
        @InjectModel( Variations) private varsRepositury: typeof Variations,
        @InjectModel(Attribute)  private attrRepository: typeof Attribute,
        private jwt: JwtService,

        ){}
    
    async getCart(hs: string){
        const token = this.jwt.decode(hs.split(' ')[1])
        try {
            const res = await this.productRepositury.findAll({
                
                include:[ {
                    model: Cart,
                    where: {userId: token.id}
                },
                {
                    model: Previews
                }]
            });
            return res;
        } catch (error) {
            throw error;
        }
    }


    async addToCart(dto: AddToCartDto, hs: string){
        try {
            const pr= await this.varsRepositury.findOne({where:{productId: dto.productId}})
            const token = this.jwt.decode(hs.split(' ')[1])
            if(pr){
                if(dto.varId){
                    return await this.cartRepository.create({
                        productId: dto.productId,
                        userId: token.id,
                        varId: dto.varId,
                        count: dto.count
        
                    })
                }
                else{
                    throw new HttpException("Выбреите атрибут товара", HttpStatus.BAD_REQUEST)
                }
            }
            else{
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

    async plusCount(dto:RemoveFromCartDto){
        try {
            const product= await this.cartRepository.findOne({
                where:{
                    productId:dto.productId
                }
            })
            return await this.cartRepository.update({count:product.count+1},{where:{productId:dto.productId}})
        } catch (error) {
            throw error;
        }
    
    }

    
    async minusCount(dto:RemoveFromCartDto){
    try {
        const product= await this.cartRepository.findOne({
            where:{
                productId:dto.productId
            }
        })
        if(product.count>1){
            return await this.cartRepository.update({count:product.count-1},{where:{productId:dto.productId}})
        }
        else{
            throw new HttpException("Ошибка", HttpStatus.BAD_REQUEST)
        }
    } catch (error) {
        throw error;
    }
    
    }

    async countAll(userId: number){
        try {
            let sum=0;
            let cart= await this.productRepositury.findAll(
                {
                    attributes:['price','sale_price'],
                    include:{
                        model: Cart,
                        
                        where:{userId}
        
                    }
            })
            if(cart.length>0)
            {
                for(let el of cart){
                    if(el.sale_price!=null){
                        sum+=el.sale_price;
            
                    }
                    else{
                        sum+=el.price;
                    }
                }
            }
            
        return sum;
        } catch (error) {
            throw error;
        }
    

        
    }
}
