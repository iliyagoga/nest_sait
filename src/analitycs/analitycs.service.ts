import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Coupon } from 'src/coupon/coupon.model';
import { Order } from 'src/order/order.model';
import { Previews } from 'src/products/preview.model';
import { Product } from 'src/products/product.model';
import { User } from 'src/user/user.model';

@Injectable()
export class AnalitycsService {
    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(User) private userRepository: typeof User,
        @InjectModel(Product) private productRepository: typeof Product,
        @InjectModel(Coupon) private couponRepository: typeof Coupon
    ){}

    async getOrder(mode: string){
        
        if(mode=='w'){
            const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            let arr= []
            for(let i=1; i<8; i++){
                arr.push({label:new Date(Date.now() - (8-i) * 24 * 60 * 60 * 1000), orders:[]})
            }
            const res = await this.orderRepository.findAll({
                where:{
                    createdAt: {[Op.gte]: date.getTime()}
                }
            })
            for(let el of res){
                for(let o of arr){
                    if(o.label.getDate() ==new Date(el.createdAt).getDate()){
                        o.orders.push(el);
                    }
                }
            }

            return {labels: arr.map(v=>{
                return  new Date(v.label).getDate()
            }), values: arr.map(v=>{
                return v.orders.length
            })};
        }
        if(mode=='m'){
            const mDays=new Date(new Date(Date.now()).getFullYear(),new Date(Date.now()).getMonth()+1,0).getDate()
            const date = new Date(Date.now() - mDays * 24 * 60 * 60 * 1000)
            let arr= []
            for(let i=1; i<mDays; i++){
                arr.push({label:new Date(Date.now() - (mDays-i) * 24 * 60 * 60 * 1000), orders:[]})
            }
            const res = await this.orderRepository.findAll({
                where:{
                    createdAt: {[Op.gte]: date.getTime()}
                }
            })
            for(let el of res){
                for(let o of arr){
                    if(o.label.getDate() ==new Date(el.createdAt).getDate() && new Date(el.createdAt).getMonth() == o.label.getMonth()){
                        o.orders.push(el);
                    }
                }
            }

            return {labels: arr.map(v=>{
                return  new Date(v.label).getDate()
            }), values: arr.map(v=>{
                return v.orders.length
            })};
        }
        if(mode=='y'){
            const date = new Date(Date.now() - 12* 30 * 24 * 60 * 60 * 1000)
            let arr= []
            for(let i=1; i<13; i++){
                arr.push({label:i, orders:[]})
            }
            const res = await this.orderRepository.findAll({
                where:{
                    createdAt: {[Op.gt]: date.getTime()}
                }
            })
            for(let el of res){
                for(let o of arr){
                    if(new Date(el.createdAt).getMonth()+1 == o.label){
                        o.orders.push(el);
                    }
                }
            }

            return {labels: arr.map(v=>{
                return  v.label
            }), values: arr.map(v=>{
                return v.orders.length
            })};
           
        }

        
        return null
    }

    async getCountUsers(){
        try {
            const res = await this.userRepository.count();
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getTopProduct(limit: number){
        try {
            const res = await this.productRepository.findAll({
                include:{model: Previews},
                attributes:{     
                    include: [[Sequelize.literal(`(SELECT COUNT(*) from "OrderProducts" where "OrderProducts"."productId"="Product"."id" )`),'count']]
                },
                order: [['count','desc']],
                group:['id'],
                limit
                
               
            })
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getTopCategory(limit: number){
        try {
            const res = await  this.productRepository.sequelize.query(`(
                SELECT "categoryName" from "Categories" where "Categories"."id" in (
                    SELECT "id" from (
                    SELECT "CategoryProduct"."id" as "id", count("OrderProducts"."productId") as "count"  from "CategoryProduct" inner join "OrderProducts" on "CategoryProduct"."productId" = "OrderProducts"."productId" group by "CategoryProduct"."id" order by "count" desc
                )
                   ) limit `+limit+`
            )`)
                
               
            
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getTopCoupons(limit: number){
        try {
            const res = await this.couponRepository.findAll({
                include:{model: Order, required: true},
                attributes:{     
                    include: [[Sequelize.literal(`(SELECT COUNT(*) from "Orders" where "Orders"."couponId"="Coupon"."id" )`),'count']]
                },
                order: [['count','desc']],
                group:['id'],
                limit
                
               
            })
            return res;
        } catch (error) {
            throw error;
        }
    
    }
}
