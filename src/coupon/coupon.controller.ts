import { Body, Controller, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles-auth.decoration';
import { RedactCouponDto } from './dto/redactCoupon.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Coupon } from './coupon.model';

@ApiTags('Купоны')
@Controller('coupon')
export class CouponController {
    constructor( private couponService: CouponService){}

    
    @ApiOperation({summary:'Создание купона'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/createCoupon')
    createCoupon(@Body() dto: CreateCouponDto){
        return this.couponService.createCoupon(dto)
    }

    @ApiOperation({summary:'Удаление купона'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/deleteCoupon')
    deleteCoupon(@Body('ids') ids: number[]){
        return this.couponService.removeCoupon(ids)
    }

    @ApiOperation({summary:'Редактирование купона'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/redactCoupon')
    redactCoupon(@Body() dto: RedactCouponDto){
        return this.couponService.redactCoupon(dto)
    }

    @ApiOperation({summary:'Получение списка купонов'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCoupons')
    getCoupons(){
        return this.couponService.getCoupons()
    }

    @ApiOperation({summary:'Получение страниц (из расчета количества записей в 1 странице)'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCouponsPages/:limit')
    getCouponsPages(@Param('limit') limit: number){
        return this.couponService.getCouponsPages(limit)
    }

    @ApiOperation({summary:'Получение купонов (с фильтрами)'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN','SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCoupons/:page/:limit/:order')
    getCouponsLimit(@Param('page') page: number, @Param('limit') limit: number, @Param('order') order: string){
        return this.couponService.getCouponsLimit(page,limit, order)
    }

  

}
