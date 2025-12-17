import { CartService } from './cart.service';
import { AddToCartDto } from './dto/addToCart.dto';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import { Cart } from './cart.model';
export declare class CartController {
    private cartService;
    constructor(cartService: CartService);
    getCart(hs: string): Promise<{
        res: [unknown[], unknown];
        attrs: [unknown[], unknown];
    }>;
    addToCart(hs: string, dto: AddToCartDto): Promise<Cart>;
    removeFromCart(dto: RemoveFromCartDto): Promise<number>;
    plusCount(hs: string, productId: number, varId: number): Promise<[affectedCount: number]>;
    minusCount(hs: string, productId: number, varId: number): Promise<[affectedCount: number]>;
    changeVars(hs: string, productId: number, varId: number, newVarId: number): Promise<[affectedCount: number]>;
    countAll(hs: string): Promise<number>;
    getCoupon(coupon: string, auth: string): Promise<{
        value: string;
        id: number;
    } | {
        value: number;
        id: any;
    }>;
}
