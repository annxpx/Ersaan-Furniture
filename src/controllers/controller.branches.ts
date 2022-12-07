import branchesServices from '../services/branches.service';
import { Request, Response } from "express";
import { plainToClass } from 'class-transformer';
import { BranchUpsert } from '../dtos/branchUpsert';
import { validate } from 'class-validator';

export class branchesController{
    async getBranches(req: Request, res: Response): Promise <Response>{
        const branch = await branchesServices.getBranches()

        return res.status(200).json(branch);
    }

    async getBranch(req: Request, res: Response): Promise <Response>{
        const {id}= req.params;
        const responseDto = await branchesServices.getBranch(+id);

        return res.status(responseDto.code).json({
            message: responseDto.message,
            data: responseDto.data
        });
    }

    async createBranch(req: Request, res: Response): Promise <Response>{
        const  payload = req.body;
        const contenidoPeticion = plainToClass(BranchUpsert, payload);
        const errors = await validate(contenidoPeticion);

        if(errors.length){
            console.log(errors);
            return res.status(400).json("Error en los datos enviados");
        }
        const newBranch = await branchesServices.createBranch(contenidoPeticion)
        return res.status(201).json(newBranch);
    }

    async updateBranch(req: Request, res: Response): Promise <Response>{
        const {id} = req.params;
        const payload = req.body;
        let updateBranchDTo = plainToClass(BranchUpsert, payload);
         const errors = await validate(updateBranchDTo);
        if(errors.length>0){
            console.log(errors);
            return res.status(400).json({"Validation errors: no se pudo actualizar": "la sucursal"});
        }
        let resultadoBranch = await branchesServices.updateBranch(payload, +id, req.headers);
        if(!resultadoBranch){
            return res.status(400).json({"message": "Error al modificar la peticion"});
        }
        return res.status(200).json({"message": "Sucursal modificada con exito"});
    }

    async deleteBranch(req: Request, res: Response): Promise <Response>{
        const {id} = req.params;
        let resultadoPeticion = await branchesServices.deleteBranch(+id, req.headers); 
        if(!resultadoPeticion){
            return res.status(400).json({"message": "No se pudo eliminar la sucursal"});
        }
        return res.status(200).json({"message": "Sucursal eliminada con exito"});
    }
}