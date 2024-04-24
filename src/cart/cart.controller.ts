import { Body, Controller, Get, Header, Headers, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { GetCart } from './types/GetCart';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './cart.model';
import { CouponValue } from './types/CouponValue';

@ApiTags('Корзина')
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService){}


    @ApiOperation({summary:'Получение товаров в корзине'})
    @ApiResponse({status: 200, type: GetCart})
    @UseGuards(JwtAuthGuard)
    @Get('/getCart')
    getCart(@Headers('authorization') hs: string){
        return this.cartService.getCart(hs);
    }

    @ApiOperation({summary:'Добавление товара в корзину'})
    @ApiResponse({status: 200, type: Cart})
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    @Post('/addToCart')
    addToCart(@Headers('authorization') hs: string, @Body() dto: AddToCartDto){
        return this.cartService.addToCart(dto,hs);
    }

    @ApiOperation({summary:'Удаление товара из корзины'})
    @ApiResponse({status: 200, type: Cart})
    @UseGuards(JwtAuthGuard)
    @Post('/removeFromCart')
    removeFromCart(@Body() dto: RemoveFromCartDto){
        return this.cartService.removeFromCart(dto);
    }

    @ApiOperation({summary:'Прибавление единицы количества определенного товара'})
    @ApiResponse({status: 200, type: Cart})
    @UseGuards(JwtAuthGuard)
    @Post('/plusCount')
    plusCount(@Headers('authorization') hs: string, @Body('productId') productId: number, @Body('varId') varId: number){
        return this.cartService.plusCount(productId, varId, hs);
    }

    @ApiOperation({summary:'Убавление единицы количества определенного товара'})
    @ApiResponse({status: 200, type: Cart})
    @UseGuards(JwtAuthGuard)
    @Post('/minusCount')
    minusCount(@Headers('authorization') hs: string, @Body('productId') productId: number, @Body('varId') varId: number){
        return this.cartService.minusCount(productId, varId, hs);
    }

    @ApiOperation({summary:'Проверка вариации на существование'})
    @ApiResponse({status: 200, type: Cart})
    @UseGuards(JwtAuthGuard)
    @Post('/changeVars')
    changeVars(@Headers('authorization') hs: string, @Body('productId') productId: number, @Body('varId') varId: number, @Body('newVarId') newVarId: number)
    {
        return this.cartService.changeVars(productId, varId, newVarId, hs)
    }

    @ApiOperation({summary:'Подсчет общего количества различных товаров в корзине'})
    @ApiResponse({status: 200, type: Number})
    @UseGuards(JwtAuthGuard)
    @Get('/countAll')
    countAll(@Headers('authorization') hs: string){
        return this.cartService.countAll(hs)
    }

    @ApiOperation({summary:'Получение скидки купона'})
    @ApiResponse({status: 200, type: CouponValue})
    @UseGuards(JwtAuthGuard)
    @Get('/getCoupon/:coupon')
    getCoupon(@Param('coupon') coupon: string, @Headers('authorization') auth: string){
        return this.cartService.getCoupon(coupon,auth)
    }

}
