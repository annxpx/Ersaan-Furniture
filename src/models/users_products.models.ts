import { Model, Column, DataType, Table } from "sequelize-typescript";
@Table({
    tableName: 'users_products'
})
export class Users_Products extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public id_product: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public id_user: number;

}    