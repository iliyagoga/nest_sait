import { ApiProperty } from "@nestjs/swagger";

export class CouponValue{
    @ApiProperty({example: '{213213, 2}',description:'Значение купона'})
    readonly couponValue: {value: string, id: null}
}