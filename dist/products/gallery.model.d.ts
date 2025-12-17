import { Model } from "sequelize-typescript";
export declare class Gallery extends Model<Gallery> {
    id: number;
    title: string;
    productId: number;
}
