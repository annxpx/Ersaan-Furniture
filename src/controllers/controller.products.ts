import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import productServices from "../services/service.products";
import * as jwt from 'jsonwebtoken'

export class productsController{
    async getProducts(req: Request, res: Response): Promise <Response>{
        const products = await productServices.getProducts()

        return res.status(200).json(products)
    }

    async getProduct(req: Request, res: Response): Promise <Response>{
        const {id}= req.params
        const producto = await productServices.getProduct(+id)

        return res.status(200).json(producto)
    }

    async buyProduct(req: Request, res: Response): Promise <Response>{
        const {id} = req.params
        const resultadoPeticion = await productServices.buyProduct(+id)

        if(resultadoPeticion.respuesta){
            return res.status(200).json(resultadoPeticion.message)
        }else{
            return res.status(400).json(resultadoPeticion.message)
        }
    }

    async modProduct(req: Request, res: Response): Promise <Response>{
        const payload = req.body
        return res.json("producto modificado")
    }
}