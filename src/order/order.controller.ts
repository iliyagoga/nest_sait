import { Body, Controller, Headers, Post, UseGuards, UsePipes } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { OrderDto } from './dto/Order.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

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

    
}
