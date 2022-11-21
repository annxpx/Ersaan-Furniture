import { Request, Response, Router } from "express";
import Service from "../services/service";


export class StoreController{
    router = Router()

    constructor(){
        this.initRoutes()
    }

    initRoutes(){
        this.router.get('/furniture', this.getList)
        this.router.get('/furniture/:id', this.getOne)
        this.router.post('/buyFurniture', this.buyOne)
        this.router.get('/users', this.getUsers)
    }

    async getList(req: Request, res: Response): Promise <Response>{
        const furnitureList = await Service.getFurniture()
        return res.json(furnitureList)
    }

    async getOne(req: Request, res: Response): Promise <Response>{
        const {id}= req.params;
        const furniture = await Service.getOneFurniture(+id);

        return res.json(furniture)
    }

    async buyOne(){

    }

    async getUsers(req: Request, res: Response): Promise <Response>{
        const usersList = await Service.getUsers()
        return res.json(usersList)
    }
}