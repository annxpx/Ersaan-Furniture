import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { validate } from "class-validator";
import productServices from "../services/service.products";
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


    async modProduct(req: Request, res: Response): Promise <Response>{
        const {id} = req.params;
        const payload = req.body;
        console.log("este es el payload");
        console.log(payload);
        let updateProductDTo = plainToClass(modProductDto, payload);
        console.log("Este el es producto nuevo");
        console.log(updateProductDTo);
         const errors = await validate(updateProductDTo);
        if(errors.length>0){
            console.log(errors);
            return res.status(400).json({"Validation errors: no se pudo actualizar": "el producto"});
        }
        let resultadoproduct = await productServices.modProduct(payload, +id, req.headers);
        if(!resultadoproduct){
            return res.status(400).json({"message": "Error al modificar el producto"});
        }
        return res.status(200).json({"message": "Producto modificado con exito"});
    }

    async deleteProduct(req: Request, res: Response): Promise <Response>{
        const {id} = req.params;
        let resultadoPeticion = await productServices.deleteProduct(+id, req.headers); 
        if(!resultadoPeticion){
            return res.status(400).json({"message": "No se pudo eliminar el producto"});
        }
        return res.status(200).json({"message": "Producto eliminado con exito"});
    }
}