import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}

    @UseGuards(JwtAuthGuard)
    @Post('/addToCart')
    addToCart(@Body() dto: AddToCartDto){
        return this.cartService.addToCart(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/removeFromCart')
    removeFromCart(@Body() dto: RemoveFromCartDto){
        return this.cartService.removeFromCart(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/plusCount')
    plusCount(@Body() dto:RemoveFromCartDto){
        return this.cartService.plusCount(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/minusCount')
    minusCount(@Body() dto:RemoveFromCartDto){
        return this.cartService.minusCount(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/countAll')
    countAll(@Body() data: object){
        return this.cartService.countAll(data["userId"])
    }
}
