import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coupon } from './coupon.model';
import { JwtService } from '@nestjs/jwt';
import { RoleModule } from 'src/role/role.module';
import { Order } from 'src/order/order.model';

@Module({
    providers:[CouponService, JwtService],
    controllers: [CouponController],
    imports:[
        SequelizeModule.forFeature([Coupon,Order]),
    ],
})
export class CouponModule {

}
