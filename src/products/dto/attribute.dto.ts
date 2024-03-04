import { IsEmpty, IsString} from "class-validator";


export class AttributeDto{
    @IsEmpty({message:"Значение не должно быть пустым"})
    @IsString({message:"Значение должно быть строкой"})
    readonly attributeName: string;
}