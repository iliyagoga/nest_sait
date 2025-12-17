import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class RemoveGroupDto{
    @ApiProperty({example: '[1,2,3]', description: 'id групп категорий'})
    readonly ids: number[]

}