import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { createUserDto } from "../dtos/createUserDto";
import UserServices from "../services/service.users";
import { LogInDto } from "../dtos/logInDto";
import serviceProducts from "../services/service.products";
import * as jwt from 'jsonwebtoken'

export class productsController{
    async getProducts(req: Request, res: Response): Promise <Response>{

        return res.json("lista de productos")
    }

    async getProduct(req: Request, res: Response): Promise <Response>{

        return res.json("un producto")
    }

    async buyProduct(req: Request, res: Response): Promise <Response>{

        return res.json("producto comprado")
    }

    async modProduct(req: Request, res: Response): Promise <Response>{

        return res.json("producto modificado")
    }
}