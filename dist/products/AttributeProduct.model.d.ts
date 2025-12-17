import { Model } from "sequelize-typescript";
export declare class AttributeProduct extends Model<AttributeProduct> {
    id: number;
    productId: number;
    attributeValueId: number;
}
