import {Sequelize} from 'sequelize-typescript';
import * as dotenv from 'dotenv';
//import { Products } from '../models/products.models';



dotenv.config();
export const conn : Sequelize = new Sequelize({
    dialect: "postgres",
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
});
/*
class Connection{

    public connection: Sequelize;
    
    constructor(){
        dotenv.config();

        this.connection = new Sequelize({
            dialect: "postgres",
            port : Number(process.env.DB_PORT),
            host: process.env.DB_HOST,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            logging: false,
           /!* models: [
                Products,
                Users,
                Branches,
                Banches_Products,
                Users_Products
            ],*!/
        })

    }
}
export default Connection;*/
