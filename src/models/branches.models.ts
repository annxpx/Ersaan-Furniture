import {conn} from "../database/connection";
import * as Sequelize from "sequelize-typescript";
import {User} from "./users.models";
export interface BranchesAddModel {
    id: number;
    branchName: string;
    location: string;
}
export interface BranchModel extends Sequelize.Model<BranchesAddModel, BranchModel> {
    id: number;
    branchName: string;
    location: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
export  const Branch= conn.define<BranchModel, BranchesAddModel>("branches", {
    id: {
        type: Sequelize.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    branchName: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
        unique: true,
    },
    location: {
        type: Sequelize.DataType.STRING(50),
        allowNull: false,
    },
});

/*Branch.hasMany(User,
    {foreignKey: 'id_branch',
        sourceKey: 'id',
        as: 'users'});*/

