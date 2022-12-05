import {conn} from "../database/connection";
import * as Sequelize from "sequelize-typescript";
import {Product} from "./products.models";
import { Branch } from "./branches.models";


export interface UserAddModel {
    id: number;
    username: string;
    type: number;
    email: string;
    password: string;
}
export interface UserModel extends Sequelize.Model<UserAddModel, UserModel> {
    id: number;
    username: string;
    type: number;
    email: string;
    password: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
export  const User= conn.define<UserModel, UserAddModel>("users", {
    id: {
        type: Sequelize.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: Sequelize.DataType.STRING(30),
        allowNull: false,
        unique: true,
    },
    type: {
        type: Sequelize.DataType.INTEGER,
        unique : false,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataType.STRING(30),
        allowNull: false,
    },
    password: {
        type: Sequelize.DataType.STRING(15),
        allowNull: false,
    }
});

User.hasMany(Branch, {
    sourceKey: 'id',
    foreignKey: 'id_branches',
    as: 'users',
});


