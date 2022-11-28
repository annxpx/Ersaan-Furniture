import { plainToClass } from "class-transformer";
import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { createUserDto } from "../dtos/createUserDto";
import Service from "../services/service";
import { LogInDto } from "../dtos/logInDto";
import { changePasswordDto } from "../dtos/changePasswordDto";
import { UserCOntroller } from "./controllers.user";


export class StoreController{
    router = Router()
    userControllers : UserCOntroller

    constructor(){
        this.userControllers = new UserCOntroller()
        this.initRoutes()
    }

    initRoutes(){
        //peticion de uso practico
        this.router.get('/users', this.userControllers.getUsers)

        //peticiones de la aplicacion
        this.router.post('/login', this.userControllers.logIn)
        this.router.post('/signup', this.userControllers.singUp)
    }

    /*

// dividir los controllers en entidades
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
    */
}