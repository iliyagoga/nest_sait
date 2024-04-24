import { ApiProperty } from "@nestjs/swagger";


export class RemoveTag{
    @ApiProperty({example: '[1,2,3]', description: 'id тегов'})
    readonly tags: number[];
    
}