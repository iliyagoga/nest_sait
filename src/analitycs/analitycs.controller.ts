import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalitycsService } from './analitycs.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles-auth.decoration';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Types } from './types/type';
import { Product } from 'src/products/product.model';
import { Category } from 'src/filters/category.model';
import { Coupon } from 'src/coupon/coupon.model';

@ApiTags('Аналитика')
@Controller('analitycs')
export class AnalitycsController {
    constructor(   private analitycsService: AnalitycsService){}
 
    @ApiOperation({summary:'Получение статистики за неделю'})
    @ApiResponse({status: 200, type: Types})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrdersByWeek')
    getOrderWeek(){
        return this.analitycsService.getOrder('w')
    }

    @ApiOperation({summary:'Получение статистики за месяц'})
    @ApiResponse({status: 200, type: Types})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrdersByMounth')
    getOrderMounth(){
        return this.analitycsService.getOrder('m')
    }

    @ApiOperation({summary:'Получение статистики за год'})
    @ApiResponse({status: 200, type: Types})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrdersByYear')
    getOrderYear(){
        return this.analitycsService.getOrder('y')
    }

    @ApiOperation({summary:'Получение количества зарегистрированных пользователей'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCountUsers')
    getCountUsers(){
        return this.analitycsService.getCountUsers()
    }

    @ApiOperation({summary:'Получение списка товаров по количеству заказов'})
    @ApiResponse({status: 200, type: Product})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getTopProduct/:limit')
    getTopProduct(@Param('limit') limit: number){
        return this.analitycsService.getTopProduct(limit)
    }

    @ApiOperation({summary:'Получение списка категорий по количеству заказов'})
    @ApiResponse({status: 200, type: Category})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getTopCategory/:limit')
    getTopCategory(@Param('limit') limit: number){
        return this.analitycsService.getTopCategory(limit)
    }

    @ApiOperation({summary:'Получение списка купонов по количеству заказов'})
    @ApiResponse({status: 200, type: Coupon})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getTopCoupons/:limit')
    getTopCoupon(@Param('limit') limit: number){
        return this.analitycsService.getTopCoupons(limit)
    }

}
