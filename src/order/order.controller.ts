import { Body, Controller, Get, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { OrderDto } from './dto/Order.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { Roles } from 'src/role/roles-auth.decoration';
import { RolesGuard } from 'src/role/roles.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './order.model';

@ApiTags('Заказы')
@Controller('order')
export class OrderController {
    constructor(
        private orderRepository: OrderService){}

    @ApiOperation({summary:'Создание заказа'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/createOrder')
    createOrder(@Headers('authorization') auth: string, @Body() body: OrderDto){
        return this.orderRepository.createOrder(auth, body);

    }

    @ApiOperation({summary:'Получение списка заказов (с фильтрами)'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getOrders/:page/:limit/:vars')
    getOrders(@Param('page') page: number, @Param('limit') limit: number,@Param('vars') vars: number){
        return this.orderRepository.getOrders(page, limit, vars);
    }

    @ApiOperation({summary:'Получение количества страниц (c limit строк на 1 странице)'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getCountPages/:limit')
    getCountPages(@Param('limit') limit: number){
        return this.orderRepository.getCountPages(limit);
    }

    @ApiOperation({summary:'Изменение статуса заказа'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/updateStatus')
    updateStatus(@Body('id') id: number, @Body('orderStatus') orderStatus: number){
        return this.orderRepository.updateStatus(id,orderStatus)
    }

    @ApiOperation({summary:'Получение информации по заказу'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get('/getOrder/:id')
    getOrder(@Param('id') id: number){
        return this.orderRepository.getOrder(id)
    }

    @ApiOperation({summary:'Удаление заказов'})
    @ApiResponse({status: 200, type: Order})
    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/removeOrders')
    removeOrders(@Body('ids') ids: number[]){
        return this.orderRepository.deleteOrders(ids)
    }


    
}
