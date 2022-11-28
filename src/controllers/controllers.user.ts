import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { createUserDto } from "../dtos/createUserDto";
import UserServices from "../services/service.users";
import { LogInDto } from "../dtos/logInDto";
import { changePasswordDto } from "../dtos/changePasswordDto";


export class UserCOntroller{

    async getUsers(req: Request, res: Response): Promise <Response>{
        const usersList = await UserServices.getUsers()
        return res.json(usersList)
    }

    async logIn(req: Request, res: Response): Promise <Response>{
        const payload = req.body


        return res.json("login")
    }

    async singUp(req: Request, res: Response): Promise <Response>{

        return res.json("signup")
    }

    /*
    async logIn(req: Request, res: Response): Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(LogInDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            return res.status(400).json({"validation-errors": errors})
        }

        return res.json(await UserServices.logIn(contenidoPeticion))
    }
    */

    
    /*
    async createUser(req: Request, res: Response): Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(createUserDto, payload)
        const erros = await validate(contenidoPeticion)

        if(erros.length){
            return res.status(400).json({"validation-errors":erros})            
        }

        return res.json(await Service.createUser(contenidoPeticion))
    }
    */

    /*
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