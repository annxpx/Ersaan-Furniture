import express, {json, urlencoded} from 'express'
import { StoreController } from './controllers/controller';
import {conn} from './database/connection';
import {Product} from "./models/products.models";
import {User} from "./models/users.models";
import {Branch} from "./models/branches.models";
import {Branches_Products} from "./models/branches_products.models";

class App{

    public express : express.Application;
    storeController : StoreController


    constructor(){
        this.express = express();
        this.middlewares();
        this.db();
        this.controllers();
        this.routes();
    }

    middlewares(){
        this.express.use(json());
        this.express.use(urlencoded({extended: false}))
    }
    db(){
        conn.sync()
            .then(() => {
                Product.sync();
                User.sync();
                Branch.sync();
                Branches_Products.sync();
                console.log(`Database is connected`);
            })
            .catch((err)=> {
                console.log(`Error`, err);
            })
    }

    listen(port : number) {
        this.express.listen(port, () => 
        console.log(`Server run in: http://localhost:${port}`))
    }

    routes(){
        this.express.use('/api', this.storeController.router)
    }

    controllers(){
        this.storeController = new StoreController()
    }
}

export default new App();