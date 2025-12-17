import { Model } from "sequelize-typescript";
export declare class TagProduct extends Model<TagProduct> {
    id: number;
    tagId: number;
    productId: number;
}
