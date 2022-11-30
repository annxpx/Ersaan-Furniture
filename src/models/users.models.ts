import { Model, Column, DataType, Table } from "sequelize-typescript";
@Table({
    tableName: 'users'
})
export class Users extends Model {

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
        type: DataType.STRING(10),
        allowNull: false,
        unique: true,
    })
    public type: string;
    
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
        allowNull: true,
    })
    public id_branches: number;
}    