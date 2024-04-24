import { ApiProperty } from "@nestjs/swagger";
import { DataTypes } from "sequelize";
import { BelongsToMany, Column, HasMany, Model, Table } from "sequelize-typescript";
import { Cart } from "src/cart/cart.model";
import { Order } from "src/order/order.model";
import { Product } from "src/products/product.model";
import { RolesUser } from "src/role/RolesUser.model";
import { Role } from "src/role/role.model";

interface CreateUserAble{
    nickname: string;
    email: string;
    password: string;
}
@Table({tableName:'Users'})

export class User extends Model<User, CreateUserAble>{

    @ApiProperty({example: '1', description: 'id таблицы'})
    @Column({type: DataTypes.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'ttt@ttt.tt', description: 'Почта'})
    @Column({type: DataTypes.TEXT, unique: true, allowNull: false})

    email:string;

    @ApiProperty({example:'nick', description: 'Никнейм'})
    @Column({type: DataTypes.TEXT, allowNull: false})

    nickname: string;

    @ApiProperty({example:'123', description: 'Пароль'})
    @Column({type: DataTypes.TEXT, allowNull: false})

    password: string;

    @ApiProperty({example: '111111', description: 'Номер телефона'})
    @Column({type: DataTypes.INTEGER, unique: true})

    phone: number;

    @ApiProperty({example: 'Имя', description: 'Имя'})
    @Column ({ type: DataTypes.TEXT})

    firstName: string;

    @ApiProperty({example: 'Фамилия', description: 'Фамилия'})
    @Column ({ type: DataTypes.TEXT})
    secondName: string;

    @ApiProperty({example: 'Отчество', description: 'Отчество'})
    @Column ({ type: DataTypes.TEXT})

    fatherName: string;

    @ApiProperty({example: '1111', description: 'Серия паспорта'})
    @Column({ type: DataTypes.INTEGER})

    passportSeria: number;

    @ApiProperty({example: '222222', description: 'Номер паспорта'})
    @Column({type: DataTypes.INTEGER, unique: true})

    passportNumber:number;

    @ApiProperty({example: 'ttt.png', description: 'Аватар'})
    @Column({type: DataTypes.TEXT})

    avatar: string;

    @ApiProperty({example: 'Страна', description: 'Страна'})
    @Column({type: DataTypes.TEXT})

    country: string;

    @ApiProperty({example: 'Регион', description: 'Область, округ, штат'})
    @Column({type: DataTypes.TEXT})

    region: string;

    @ApiProperty({example: 'Город', description: 'Город'})
    @Column({type: DataTypes.TEXT})

    city: string;

    @ApiProperty({example: 'Улица', description: 'Улица'})
    @Column({type: DataTypes.TEXT})

    street: string;

    @ApiProperty({example: '8', description: 'Номер дома'})
    @Column({type: DataTypes.TEXT})

    home: string;

    @ApiProperty({example: '11', description: 'Номер квартиры'})
    @Column({type: DataTypes.TEXT})

    flat: string;

    @BelongsToMany(()=>Role, ()=>RolesUser)

    role: Role[];

    
    @BelongsToMany(()=>Product, ()=>Cart)

    product: Product[];

    @HasMany(()=>Order)

    order: Order[];


}
