import { Model } from "sequelize-typescript";
import { User } from "src/user/user.model";
export declare class Role extends Model<Role> {
    id: number;
    role: string;
    user: User[];
}
