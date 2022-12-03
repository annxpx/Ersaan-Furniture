import {conn} from "../database/connection";
import * as Sequelize from "sequelize-typescript";
import {Product} from "./products.models";
import {Branch} from "./branches.models";


export interface Branches_ProductsAddModel {
    id_product: number;
    id_branch: number;
}
export interface Branches_ProductsModel extends Sequelize.Model<Branches_ProductsAddModel, Branches_ProductsModel> {
    id_product: number;
    id_branch: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}
export  const Branches_Products= conn.define<Branches_ProductsModel, Branches_ProductsAddModel>("branches_products", {
    id_product: {
        type: Sequelize.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_branch: {
        type: Sequelize.DataType.INTEGER,
        allowNull: false,
    }
});

Branches_Products.hasMany(Product,
    {foreignKey: 'id',
        sourceKey: 'id_product',
        as: 'products'});
Branches_Products.hasMany(Branch,
    {foreignKey: 'id',
        sourceKey: 'id_branch',
        as: 'branches'});