import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles-auth.decoration';
import { RedactCouponDto } from './dto/redactCoupon.dto';

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
    deleteCoupon(@Body('ids') ids: number[]){
        return this.couponService.removeCoupon(ids)
    }
    @UseGuards(JwtAuthGuard)
    @Post('/redactCoupon')
    redactCoupon(@Body() dto: RedactCouponDto){
        return this.couponService.redactCoupon(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getCoupons')
    getCoupons(){
        return this.couponService.getCoupons()
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getCouponsPages/:limit')
    getCouponsPages(@Param('limit') limit: number){
        return this.couponService.getCouponsPages(limit)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getCoupons/:page/:limit/:order')
    getCouponsLimit(@Param('page') page: number, @Param('limit') limit: number, @Param('order') order: string){
        return this.couponService.getCouponsLimit(page,limit, order)
    }

    @Get('/getCoupon/:coupon')
    getCoupon(@Param('coupon') coupon: string){
        return this.couponService.getCoupon(coupon)
    }


}
