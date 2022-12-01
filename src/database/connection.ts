import {Sequelize} from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Products } from '../models/products.models';
import { Users } from '../models/users.models';
import {Branches} from "../models/branches.models";
import {Banches_Products} from "../models/banches_products.models";
import {Users_Products} from "../models/users_products.models";

class Connection{

    public connection: Sequelize;
    
    constructor(){
        dotenv.config();

        this.connection = new Sequelize({
            dialect: "postgres",
            port : 5432,
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: false,
            models: [
                Products,
                Users,
                Branches,
                Banches_Products,
                Users_Products
            ],
        })

    }
}
export default Connection;