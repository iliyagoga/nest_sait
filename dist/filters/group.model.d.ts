import { Model } from "sequelize-typescript";
import { Category } from "./category.model";
export declare class Group extends Model<Group> {
    id: number;
    groupTitle: string;
    category: Category[];
}
