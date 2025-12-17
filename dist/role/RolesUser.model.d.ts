import { Model } from "sequelize-typescript";
export declare class RolesUser extends Model<RolesUser> {
    id: number;
    roleId: number;
    userId: number;
}
