import 'dotenv'
import * as jwt from 'jsonwebtoken'
import {ResponseDto} from '../common/ResponseDto';
import {Branch} from "../models/branches.models";
import { BranchUpsert } from '../dtos/branchUpsert';
import { User } from '../models/users.models';

class branchesServices {

    private responseDto: ResponseDto;

    public async getBranches(){
        this.responseDto = new ResponseDto();
        try{
            this.responseDto.data = await Branch.findAll({});
            this.responseDto.code = 200;
            this.responseDto.message = 'Listado de Productos de la base de datos';
            return this.responseDto;
        }catch(error){
            this.responseDto.code = 500;
            this.responseDto.message = 'Error en el servidor';
            console.log({error});
            return this.responseDto;
        }
    }

    async getBranch(id:number){
        this. responseDto = new ResponseDto();
        const branch = await Branch.findOne({where: {id}});
        if(!branch){
            this.responseDto.message = `La sucursal que busca no se encuentra`;
            this.responseDto.code = 404;
            return this.responseDto;
        }
        this.responseDto.code = 200;
        this.responseDto.message = "Sucursal solicitado"
        this.responseDto.data = branch;
        return this.responseDto;
    }

    async createBranch(branchUpsert: BranchUpsert){
        this. responseDto = new ResponseDto();
        try {
            this.responseDto.data = Branch.create(branchUpsert);
            this.responseDto.code = 201;
            this.responseDto.message = "Sucursal ingresada con exito";
            return this.responseDto;
        } catch (error) {
            this.responseDto.code = 500;
            this.responseDto.message = "Error al ingresar la sucursal";
            return this.responseDto; 
        }
    }

    async updateBranch(branchUpsert: BranchUpsert, id: number, req: any){
        const branch = await this.getBranch(id);
        const token = req['x-access-token'];
        const decoded = jwt.verify(token, process.env.MY_SECRET_TOKEN)
        const iduser = decoded.id;
        if(!iduser){
            return false;
        }
        const dataUser = await User.findOne({where: iduser});
        if(dataUser.type !== 1){
            return false
        }
        if(!(branch.code==200)){
            return false;
        }
        const newBranch= {
            id,
            ...branchUpsert
        };
        const updatedBranch = await Branch.update(newBranch, {where:{id}});
        return true;
    }

    async deleteBranch(id: number, req: any){
        const branch = await this.getBranch(id);
        const token = req['x-access-token'];
        const decoded = jwt.verify(token, process.env.MY_SECRET_TOKEN)
        const iduser = decoded.id;
        if(!iduser){
            return false;
        }
        const dataUser = await User.findOne({where: iduser});
        if(dataUser.type !== 1){
            return false
        }
        if(!(branch.code==200)){
            return false;
        }
        const deleteBranch = await Branch.destroy({where: {id}});
        return true;
    }
}
export default new branchesServices()