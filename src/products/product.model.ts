import { DataTypes } from "sequelize";
import { BelongsTo, BelongsToMany, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { CategoryProduct } from "src/filters/CategoryProduct.model";
import { Category } from "src/filters/category.model";
import { AttributeValue } from "./AttributeValuea.model";
import { AttributeProduct } from "./AttributeProduct.model";
import { Tag } from "src/filters/tag.model";
import { TagProduct } from "src/filters/TagProduct.model";
import { User } from "src/user/user.model";
import { Cart } from "src/cart/cart.model";
import { OrderProduct } from "src/order/orderProduct.model";
import { Previews } from "./preview.model";
import { Gallery } from "./gallery.model";
import { Variations } from "./variations.model";
import { RecommendationProducts } from "./recommendationProduct.model";
import { Order } from "src/order/order.model";


@Table({tableName:"Products"})

export class Product extends Model<Product>{

    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column ({ type: DataTypes.TEXT, allowNull: false})

    productName: string;

    @Column ({ type: DataTypes.TEXT, allowNull: false})

    title: string;

    @Column ({ type: DataTypes.TEXT})

    description: string;

    @Column ({ type: DataTypes.INTEGER})

    price: number;

    @Column ({ type: DataTypes.INTEGER})

    sale_price: number;
    @Column ({type: DataTypes.TEXT})

    mean_image: string;

    @Column ({ type: DataTypes.INTEGER, defaultValue: 0})

    rating: number;

    @Column ({ type: DataTypes.INTEGER, defaultValue: 0})

    ratingCount: number


    @BelongsToMany(()=>Category,()=>CategoryProduct)
    category: Category[];

    @BelongsToMany(()=>AttributeValue,()=>AttributeProduct)
    attributeValue: AttributeValue[];

    @BelongsToMany(()=>Tag,()=>TagProduct)
    tag: Tag[]

    @BelongsToMany(()=>User, ()=>Cart)

    user: User[]

    @HasMany(()=>OrderProduct)
    orderProduct: OrderProduct[]

    @HasMany(()=>Cart)
    cart: Cart[]

    @HasMany(()=>Previews)
    previews:  Previews[]

    @HasMany(()=>Gallery)
    gallery: Gallery[]

    @HasMany(()=>Variations)
    variations: Variations[];

    @HasMany(()=>RecommendationProducts)
    recommendationProducts: RecommendationProducts[];

    
    @BelongsToMany(()=>Order, ()=>OrderProduct)
    orders: Order[]





}