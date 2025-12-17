import { Model } from "sequelize-typescript";
export declare class Previews extends Model<Previews> {
    id: number;
    title: string;
    productId: number;
}
