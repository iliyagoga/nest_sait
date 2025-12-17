import { Model } from "sequelize-typescript";
import { Product } from "src/products/product.model";
export declare class Tag extends Model<Tag> {
    id: number;
    tagTitle: string;
    product: Product[];
}
