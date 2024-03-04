import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('coupon')
export class CouponController {
    constructor( private couponService: CouponService){}

    @UseGuards(JwtAuthGuard)
    @Post('/createCoupon')
    createCoupon(@Body() dto: CreateCouponDto){
        return this.couponService.createCoupon(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/deleteCoupon')
    deleteCoupon(@Body() data: object){
        return this.couponService.removeCoupon(data["id"])
    }

    @UseGuards(JwtAuthGuard)
    @Post('/redactCoupon')
    redactCoupon(@Body() data: object){
        return this.couponService.redactCoupon(data["id"])
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getCoupons')
    getCoupons(){
        return this.couponService.getCoupons()
    }


}
