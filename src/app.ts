import express, {json, urlencoded} from 'express'
import { StoreController } from './controllers/controller';
import Connection from './database/connection';

class App{

    public express : express.Application;
    storeController : StoreController
    private connection: Connection | undefined;


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
        this.connection = new Connection();
        this.connection.connection.sync()
            .then(() => {
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