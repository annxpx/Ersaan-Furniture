import * as jwt from 'jsonwebtoken'
import 'dotenv'
import { modProductDto } from '../dtos/modProductDto'
import {Product} from "../models/products.models";
import {ResponseDto} from "../common/ResponseDto";
import { User } from '../models/users.models';

class productsServices{

    private responseDto : ResponseDto;


    public async getProducts(){
        this.responseDto = new ResponseDto();
        try{
            this.responseDto.data = await Product.findAll({});
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

    async getProduct(id:number){
        this. responseDto = new ResponseDto();
        const producto = await Product.findOne({where: {id}});
        console.log(`el producto es :${producto}`);
        if(!producto){
            this.responseDto.message = `El producto que busca no se encuentra`;
            this.responseDto.code = 404;
            return this.responseDto;
        }
        this.responseDto.code = 200;
        this.responseDto.message = "Producto solicitado"
        this.responseDto.data = producto;
        return this.responseDto;
    }

    async createProduct(modProduct: modProductDto){
        this. responseDto = new ResponseDto();
        try {
            this.responseDto.data = Product.create(modProduct);
            this.responseDto.code = 201;
            this.responseDto.message = 'Producto ingresado con exito';
            return this.responseDto;
        } catch (error) {
            this.responseDto.code = 500;
            this.responseDto.message = 'Error al ingresar el producto';
            return this.responseDto; 
        }
    }

    async modProduct(modProductDto: modProductDto, id: number, req: any){
        const producto = await this.getProduct(id);
        //Aqui se consulta el id del usuario mediante el token
        const token = req['x-access-token'];
        const decoded = jwt.verify(token, process.env.MY_SECRET_TOKEN)
        const iduser = decoded.id;
        if(!iduser){
            return false;
        }
        //Se verifica si el usuario tiene permiso para modificar el producto
        const dataUser = await User.findOne({where: iduser});
        if(dataUser.type !== 1){
            return false
        }

        if(!(producto.code==200)){
            return false;
        }
        const newProdu = {
            id,
            ...modProductDto
        };
        const updatedProd = await Product.update(newProdu, {where:{id}});
        return true
    }
                  
}

export default new productsServices