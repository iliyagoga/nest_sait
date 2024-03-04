import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coupon } from './coupon.model';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { RedactCouponDto } from './dto/redactCoupon.dto';

@Injectable()
export class CouponService {
    constructor(
        @InjectModel(Coupon) private couponRepository: typeof Coupon
    ){}

    async createCoupon(dto: CreateCouponDto){
        return await this.couponRepository.create(dto)
    }

    async removeCoupon(id: number){
        return await this.couponRepository.destroy(
        {
                where:
                {
                    id
                }
            }
        )
    }

    async redactCoupon(dto: RedactCouponDto){
        return await this.couponRepository.update(
           
            dto,
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



}
