import { Model } from "sequelize-typescript";
export declare class CategoryProduct extends Model<CategoryProduct> {
    id: number;
    productId: number;
    categoryId: number;
}
