import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coupon } from './coupon.model';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { RedactCouponDto } from './dto/redactCoupon.dto';

@Injectable()
export class CouponService {
    constructor(
        @InjectModel(Coupon) private couponRepository: typeof Coupon,
    ){}

    async createCoupon(dto: CreateCouponDto){
        return await this.couponRepository.create(dto)
    }

    async removeCoupon(ids: number[]){
        return await this.couponRepository.destroy(
        {
                where:
                {
                    id: ids
                }
            }
        )
    }

    async redactCoupon(dto: RedactCouponDto){
        return await this.couponRepository.update(
            {couponTitle: dto.couponTitle,
            couponValue: dto.couponValue,
            couponTimelife: dto.couponTimelife
            },
            {
                where:{
                    id: dto.id
                }
            }
        )

    }

    async getCoupons(){
        return await this.couponRepository.findAll()
    }

    async getCouponsLimit(page: number, limit: number, order: string ){
        let o: boolean
        if(order=='true'){
            o=true
        }
        if(order=='false'){
            o=false
        }
            
        if(o===true){
            const res = await this.couponRepository.findAll({
                offset: limit* page,
                limit,
                order: [['couponTimelife','desc']]
            })
            return res;
        }
        if(o===false){
            const res = await this.couponRepository.findAll({
                offset: limit* page,
                limit,
                order: [['couponTimelife','asc']]
            })
            return res;
        }
        const res = await this.couponRepository.findAll({
            offset: limit* page,
            limit,
            order: [['id','desc']]
        })
        return res;


      
    }

    async getCouponsPages(limit: number){
        return Math.floor(await this.couponRepository.count()/limit)+1
    }

    async checkCoupon(id: number){
        const c = await this.couponRepository.findOne({where: {id}})
        if(c){
            return c.id
        }
        return null
    }



}
