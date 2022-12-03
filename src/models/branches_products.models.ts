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
export  const Branches_Products= conn.define<Branches_ProductsModel, Branches_ProductsAddModel>("branches_products",
    {
        id_product: {
            type: Sequelize.DataType.INTEGER,
    },
        id_branch: {
            type: Sequelize.DataType.INTEGER,
    }
    });

Product.belongsToMany(Branch, { 
    through: Branches_Products,
    foreignKey: 'id_product',
    otherKey: 'id_branch',
});
Branch.belongsToMany(Product, { 
    through: Branches_Products,
    foreignKey: 'id_branch',
    otherKey: 'id_product',
});