import {conn} from "../database/connection";
import * as Sequelize from "sequelize-typescript";


export interface ProductAddModel{
    id: number;
    productName: string;
    price: number;
    brand: string;
    status: string;
    width: number;
    length: number;
    height: number;
    color: string;
    material: string;
    pieces: number;
    quantity: number;
}
export interface ProductModel extends Sequelize.Model<ProductAddModel, ProductModel> {
    id: number;
    productName: string;
    price: number;
    brand: string;
    status: string;
    width: number;
    length: number;
    height: number;
    color: string;
    material: string;
    pieces: number;
    quantity: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}
export  const Product= conn.define<ProductModel, ProductAddModel>("products", {
    id: {
        type: Sequelize.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
        unique: true,
    },
    price: {
        type: Sequelize.DataType.FLOAT,
        allowNull: false,
    },
    brand: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
    },
    status: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
    },
    width: {
        type: Sequelize.DataType.INTEGER,
        allowNull: false,
    },
    length: {
        type: Sequelize.DataType.INTEGER,
        allowNull: false,
    },
    height: {
        type: Sequelize.DataType.INTEGER,
        allowNull: false,
    },
    color: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
    },
    material: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
    },
    pieces: {
        type: Sequelize.DataType.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.DataType.INTEGER,
        allowNull: false,
    },
});
