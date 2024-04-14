import { Body, Controller, Get, Header, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}


    @UseGuards(JwtAuthGuard)
    @Get('/getCart')
    getCart(@Headers('authorization') hs: string){
        return this.cartService.getCart(hs);
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/addToCart')
    addToCart(@Headers('authorization') hs: string, @Body() dto: AddToCartDto){
        return this.cartService.addToCart(dto,hs);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/removeFromCart')
    removeFromCart(@Body() dto: RemoveFromCartDto){
        return this.cartService.removeFromCart(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/plusCount')
    plusCount(@Headers('authorization') hs: string,@Body() dto:RemoveFromCartDto){
        return this.cartService.plusCount(dto,hs);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/minusCount')
    minusCount(@Headers('authorization') hs: string, @Body() dto:RemoveFromCartDto){
        return this.cartService.minusCount(dto,hs);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/countAll')
    countAll(@Headers('authorization') hs: string){
        return this.cartService.countAll(hs)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/getCoupon/:coupon')
    getCoupon(@Param('coupon') coupon: string, @Headers('authorization') auth: string){
        return this.cartService.getCoupon(coupon,auth)
    }

}
