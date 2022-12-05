import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import productServices from "../services/service.products";
import serviceUsers from "../services/service.users";
import { modProductDto } from "../dtos/modProductDto";

export class productsController{
    async getProducts(req: Request, res: Response): Promise <Response>{
        const products = await productServices.getProducts()

        return res.status(200).json(products)
    }

    async getProduct(req: Request, res: Response): Promise <Response>{
        const {id}= req.params
        const resultadoPeticion = await productServices.getProduct(+id)

        return res.status(resultadoPeticion.code).json(resultadoPeticion.message)
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
            return res.status(400).json("A login is required")
        }
        if(userData.tipo==0){
            return res.status(400).json("You are not an admin")
        }
        delete req.body.userAccessData
        const payload = req.body
        const data = plainToClass(modProductDto, payload)
        const errors = await validate(data)

        if(errors.length){
            return res.status(400).json(errors)
        }

        const results = await productServices.modProduct(data, +id)
        return res.status(results.code).json(results.message)
    }
}