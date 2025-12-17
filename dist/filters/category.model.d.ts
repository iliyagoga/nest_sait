import { Model } from "sequelize-typescript";
import { Group } from "./group.model";
import { Product } from "src/products/product.model";
export declare class Category extends Model<Category> {
    id: number;
    categoryName: string;
    groupId: number;
    group: Group;
    product: Product[];
}
