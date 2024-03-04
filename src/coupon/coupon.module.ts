import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Coupon } from './coupon.model';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers:[CouponService, JwtService],
    controllers: [CouponController],
    imports:[
        SequelizeModule.forFeature([Coupon])
    ],
})
export class CouponModule {

}
