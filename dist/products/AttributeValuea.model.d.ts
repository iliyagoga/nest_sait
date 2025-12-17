import { Model } from "sequelize-typescript";
import { Product } from "./product.model";
import { Variations } from "./variations.model";
export declare class AttributeValue extends Model<AttributeValue> {
    id: number;
    attributeValue: string;
    attributeId: number;
    product: Product[];
    variations: Variations[];
}
