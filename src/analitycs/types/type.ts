import { ApiProperty } from "@nestjs/swagger";

export class Types{
    @ApiProperty({example:"[{label: 1, values: 5},{label: 2, values: 10}]", description:"Статистика единицу времени"})
    readonly Statistic: {labels: number, values: number}[]
}