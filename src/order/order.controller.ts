import { Body, Controller, Get, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { OrderDto } from './dto/Order.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from 'src/role/roles-auth.decoration';
import { RolesGuard } from 'src/role/roles.guard';

@Controller('order')
export class OrderController {
    constructor(
        private orderRepository: OrderService){}

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/createOrder')
    createOrder(@Headers('authorization') auth: string, @Body() body: OrderDto){
        return this.orderRepository.createOrder(auth, body);

    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getOrders/:page/:limit/:vars')
    getOrders(@Param('page') page: number, @Param('limit') limit: number,@Param('vars') vars: number){
        return this.orderRepository.getOrders(page, limit, vars);
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get('/getCountPages/:limit')
    getCountPages(@Param('limit') limit: number){
        return this.orderRepository.getCountPages(limit);
    }

    
}
