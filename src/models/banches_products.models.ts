import { Model, Column, DataType, Table } from "sequelize-typescript";
@Table({
    tableName: 'branches_products'
})
export class Banches_Products extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public id_product: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public id_branch: number;

}    