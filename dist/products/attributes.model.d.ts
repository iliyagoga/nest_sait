import { Model } from "sequelize-typescript";
import { AttributeValue } from "./AttributeValuea.model";
export declare class Attribute extends Model<Attribute> {
    id: number;
    attributeName: string;
    attributeValue: AttributeValue[];
}
