import * as jwt from 'jsonwebtoken'
import 'dotenv'
import { modProductDto } from '../dtos/modProductDto'
import { Index } from 'sequelize-typescript'
import {Product} from "../models/products.models";
import {ResponseDto} from "../common/ResponseDto";
import { User } from '../models/users.models';

class productsServices{

    private responseDto : ResponseDto;

    productosDePrueba = [
        {id: 1, name: "sillon", precio: 500, marca: "gibson", status: "nuevo", width: 30, length: 30, height: 50, color: "negro", material: "madera", cantidad: 2, pieces: 1, sucursal: 1},
        {id: 2, name: "cama", precio: 11500, marca: "olimpia", status: "nuevo", width: 70, length: 50, height: 50, color: "blanca", material: "madera", cantidad: 2, pieces: 2, sucursal: 1},
        {id: 3, name: "televisor", precio: 7500, marca: "samsung", status: "nuevo", width: 30, length: 3, height: 20, color: "negro", material: "plastico", cantidad: 2, pieces: 5, sucursal: 2},
        {id: 4, name: "mesa", precio: 2500, marca: "gibson", status: "usado", width: 30, length: 30, height: 50, color: "cafe", material: "madera", cantidad: 2, pieces: 1, sucursal: 2}
    ]

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
        } catch (error) {
            this.responseDto.code = 500;
            this.responseDto.message = 'Error al ingresar el producto';
            return this.responseDto; 
        }
    }

    async buyProduct(id: number){
        const index = this.productosDePrueba.findIndex(valorActual => valorActual.id==id);
        const producto = this.productosDePrueba.find(valorActual => valorActual.id==id);
        if(!(index>=0)){
            return {code: 400, message: "indice no existente"}
        }

        if(this.productosDePrueba[index].cantidad==0){
            return {code: 400, message: "ya no hay stock de este producto"}
        }

        this.productosDePrueba[index].cantidad-=1
        return {code: 200, message:producto}

    }

    async modProduct(modProductDto: modProductDto, id: number, req: any){
        const producto = await this.getProduct(id);
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
        if(!(producto.code==200)){
            return false;
        }
        const newProdu = {
            id,
            ...modProductDto
        };
        console.log("el id del producto es "+ id);
        const updatedProd = await Product.update(newProdu, {where:{id}});
        return true
    }
                  
}

export default new productsServices