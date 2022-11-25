import { Model, Column, DataType, Table } from "sequelize-typescript";
@Table({
    tableName: 'branches'
})
export class Branches extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    public id: number;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true,
    })
    public username: string;

    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        unique: true,
    })
    public location: string;

}    