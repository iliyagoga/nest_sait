import { AddToCartDto } from './dto/addToCart.dto';
import { Cart } from './cart.model';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';
import { Product } from 'src/products/product.model';
import { JwtService } from '@nestjs/jwt';
import { Variations } from 'src/products/variations.model';
import { Attribute } from 'src/products/attributes.model';
import { Coupon } from 'src/coupon/coupon.model';
export declare class CartService {
    private cartRepository;
    private productRepositury;
    private varsRepositury;
    private attrRepository;
    private couponRepository;
    private jwt;
    constructor(cartRepository: typeof Cart, productRepositury: typeof Product, varsRepositury: typeof Variations, attrRepository: typeof Attribute, couponRepository: typeof Coupon, jwt: JwtService);
    getCart(hs: string): Promise<{
        res: [unknown[], unknown];
        attrs: [unknown[], unknown];
    }>;
    addToCart(dto: AddToCartDto, hs: string): Promise<Cart>;
    removeFromCart(dto: RemoveFromCartDto): Promise<number>;
    plusCount(productId: number, varId: number, hs: string): Promise<[affectedCount: number]>;
    minusCount(productId: number, varId: number, hs: string): Promise<[affectedCount: number]>;
    countAll(hs: string): Promise<number>;
    sum(auth: string): Promise<number>;
    getCoupon(coupon: string, auth: string): Promise<{
        value: string;
        id: number;
    } | {
        value: number;
        id: any;
    }>;
    changeVars(productId: number, varId: number, newVarId: number, hs: string): Promise<[affectedCount: number]>;
}
