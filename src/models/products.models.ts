import { Model, Column, DataType, Table } from "sequelize-typescript";
import {FloatDataType} from "sequelize";
@Table({
    tableName: 'products'
})
export class Products extends Model{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    public id: number;
    
    @Column({
        type: DataType.STRING(250),
        allowNull: false,
        unique: true,
    })
    public productName: string;
    
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    public price: FloatDataType;
    
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    
    public marca: string;
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    public status: string;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public width: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public length: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public height: number;
    
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    public color: string;
    
    @Column({
        type: DataType.STRING(250),
        allowNull: false,
    })
    public material: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public pieces: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public branches_id: number;
}