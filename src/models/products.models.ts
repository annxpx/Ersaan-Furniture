import {conn} from "../database/connection";
import * as Sequelize from "sequelize-typescript";
import {Branch} from "./branches.models";

export interface ProductAddModel {
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

export const Product = conn.define<ProductModel, ProductAddModel>("products", {
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



Branch.hasMany(Product,
    {foreignKey: 'id_branch',
        sourceKey: 'id',
        as: 'branch'});

/*
/!*
Product.belongsToMany(User, {
    through: 'user_product'});

Product.belongsToMany(Branch, {
    through: 'branches_products'});
*!/

export const BranchProduct = conn.define('branch_product', {});
Branch.belongsToMany(Product, {through: BranchProduct});
Product.belongsToMany(Branch, {through: BranchProduct});

export const UserProduct = conn.define('user_product', {});
User.belongsToMany(Product, {through: UserProduct});
Product.belongsToMany(User, {through: UserProduct});

//user.addProduct(product, { through: { role: 'manager' }});*/
