import { Model } from "sequelize-typescript";
export declare class RecommendationProducts extends Model<RecommendationProducts> {
    id: number;
    productId: number;
    productRecId: number;
}
