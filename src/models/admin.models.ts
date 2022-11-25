import { Model, Column, DataType, Table } from "sequelize-typescript";
@Table({
    tableName: 'admins'
})
export class Admins extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    public id: number;

    @Column({
        type: DataType.STRING(75),
        allowNull: false,
        unique: true,
    })
    public username: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    public email: string;

    @Column({
        type: DataType.STRING(15),
    })
    public password: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public branches_id: number;
}    