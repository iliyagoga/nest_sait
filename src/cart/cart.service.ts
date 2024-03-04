import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/addToCart.dto';
import { Cart } from './cart.model';
import { InjectModel } from '@nestjs/sequelize';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import sequelize from 'sequelize';
import { Product } from 'src/products/product.model';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart)  private cartRepository: typeof Cart,
        @InjectModel( Product) private productRepositury: typeof Product
        ){}

 async addToCart(dto: AddToCartDto){
    return await this.cartRepository.create(dto)
 }

 async removeFromCart(dto:RemoveFromCartDto){
    return await this.cartRepository.destroy({where:{...dto}})

 }

 async plusCount(dto:RemoveFromCartDto){
    const product= await this.cartRepository.findOne({
        where:{
            productId:dto.productId
        }
    })
    return await this.cartRepository.update({count:product.count+1},{where:{productId:dto.productId}})
 }

 
 async minusCount(dto:RemoveFromCartDto){
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
  
 }

async countAll(userId: number){
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

    
}
}
