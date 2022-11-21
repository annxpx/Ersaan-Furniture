import express, {json} from 'express'
import { StoreController } from './controllers/controller';

class App{

    public express : express.Application;
    storeController : StoreController

    constructor(){
        this.express = express();
        this.middlewares();
        this.controllers()
        this.routes()
    }

    middlewares(){
        this.express.use(json());
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