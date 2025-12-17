import { OrderDto } from './dto/Order.dto';
import { Order } from './order.model';
import { AddresOrder } from './addresOrder.model';
import { OrderProduct } from './orderProduct.model';
import { Cart } from 'src/cart/cart.model';
import { JwtService } from '@nestjs/jwt';
import { CartService } from 'src/cart/cart.service';
import { OrderUser } from './orderUser.model';
import { Product } from 'src/products/product.model';
import { CouponService } from 'src/coupon/coupon.service';
import { Coupon } from 'src/coupon/coupon.model';
import { AttributeValue } from 'src/products/AttributeValuea.model';
export declare class OrderService {
    private jwt;
    private cartService;
    private couponService;
    private orders;
    private addresOrder;
    private orderProduct;
    private productRepository;
    private cart;
    private orderUser;
    private couponRepository;
    private attributeValueRepository;
    constructor(jwt: JwtService, cartService: CartService, couponService: CouponService, orders: typeof Order, addresOrder: typeof AddresOrder, orderProduct: typeof OrderProduct, productRepository: typeof Product, cart: typeof Cart, orderUser: typeof OrderUser, couponRepository: typeof Coupon, attributeValueRepository: typeof AttributeValue);
    createOrder(auth: string, order: OrderDto): Promise<boolean>;
    getOrders(page: number, limit: number, vars: number): Promise<Order[]>;
    getCountPages(limit: number): Promise<number>;
    updateStatus(id: number, orderStatus: number): Promise<boolean>;
    getOrder(id: number): Promise<{
        order: Order;
        user: OrderUser;
        addres: AddresOrder;
        products: [unknown[], unknown];
        sum: number;
        coupon: Coupon;
    }>;
    deleteOrders(ids: number[]): Promise<boolean>;
}
