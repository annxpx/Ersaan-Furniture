import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import productServices from "../services/service.products";
import serviceUsers from "../services/service.users";
import { modProductDto } from "../dtos/modProductDto";
import serviceProducts from "../services/service.products";

export class productsController{
    async getProducts(req: Request, res: Response): Promise <Response>{
        const products = await productServices.getProducts()

        return res.status(200).json(products)
    }

    async getProduct(req: Request, res: Response): Promise <Response>{
        const {id}= req.params;
        const responseDto = await productServices.getProduct(+id)

        return res.status(responseDto.code).json({
            message: responseDto.message,
            data: responseDto.data
        });
    }

    async createProduct(req: Request, res: Response): Promise <Response>{
        const  payload = req.body
        const contenidoPeticion = plainToClass(modProductDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            console.log(errors)
            return res.status(400).json("Error en los datos enviados")
        }

        return res.status(200).json(await serviceProducts.createProduct(contenidoPeticion))
    }

    async buyProduct(req: Request, res: Response): Promise <Response>{
        const {id} = req.params
        const resultadoPeticion = await productServices.buyProduct(+id)

        return res.status(resultadoPeticion.code).json(resultadoPeticion.message)
    }

    async modProduct(req: Request, res: Response): Promise <Response>{
        const {id}= req.params
        const userIdProvided = req.body.userAccessData.userId
        const userData =  await serviceUsers.getOneUser(userIdProvided)
        if(!userData){
            return res.status(400).json("como lograste llegar hasta aqui si no has iniciado sesion?")
        }
        if(userData.tipo==0){
            return res.status(400).json("El usuario actual no tiene los privilegios suficientes para realizar esta accion")
        }
        delete req.body.userAccessData
        const payload = req.body
        const contenidoPeticion = plainToClass(modProductDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            return res.status(400).json(errors)
        }

        const resultadoPeticion = await productServices.modProduct(contenidoPeticion, +id)
        return res.status(resultadoPeticion.code).json(resultadoPeticion.message)
    }
}