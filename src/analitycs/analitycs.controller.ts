import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalitycsService } from './analitycs.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { RolesGuard } from 'src/role/roles.guard';
import { Roles } from 'src/role/roles-auth.decoration';

@Controller('analitycs')
export class AnalitycsController {
    constructor(   private analitycsService: AnalitycsService){}
 

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrdersByWeek')
    getOrderWeek(){
        return this.analitycsService.getOrder('w')
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrdersByMounth')
    getOrderMounth(){
        return this.analitycsService.getOrder('m')
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrdersByYear')
    getOrderYear(){
        return this.analitycsService.getOrder('y')
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCountUsers')
    getCountUsers(){
        return this.analitycsService.getCountUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getTopProduct/:limit')
    getTopProduct(@Param('limit') limit: number){
        return this.analitycsService.getTopProduct(limit)
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getTopCategory/:limit')
    getTopCategory(@Param('limit') limit: number){
        return this.analitycsService.getTopCategory(limit)
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getTopCoupons/:limit')
    getTopCoupon(@Param('limit') limit: number){
        return this.analitycsService.getTopCoupons(limit)
    }

}
