import { plainToClass } from "class-transformer";
import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { createUserDto } from "../dtos/createUserDto";
import Service from "../services/service";
import { LogInDto } from "../dtos/logInDto";
import { changePasswordDto } from "../dtos/changePasswordDto";


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
        this.router.post('/createUser', this.createUser)
        this.router.post('/logIn', this.logIn)
        this.router.post('/changePassword', this.changePassword)
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

    async createUser(req: Request, res: Response): Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(createUserDto, payload)
        const erros = await validate(contenidoPeticion)

        if(erros.length){
            return res.status(400).json({"validation-errors":erros})            
        }

        return res.json(await Service.createUser(contenidoPeticion))
    }

    async logIn(req: Request, res: Response): Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(LogInDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            return res.status(400).json({"validation-errors": errors})
        }

        return res.json(await Service.logIn(contenidoPeticion))
    }

    async changePassword(req: Request, res: Response) : Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(changePasswordDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            return res.status(400).json({"validation-errors": errors})
        }

        return res.json(await Service.changePassword(contenidoPeticion))
    }
}