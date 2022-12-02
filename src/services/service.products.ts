import * as jwt from 'jsonwebtoken'
import 'dotenv'
import { modProductDto } from '../dtos/modProductDto'
import { Index } from 'sequelize-typescript'
import {Product} from "../models/products.models";

class productsServices{

    productosDePrueba = [
        {id: 1, name: "sillon", precio: 500, marca: "gibson", status: "nuevo", width: 30, length: 30, height: 50, color: "negro", material: "madera", cantidad: 2, pieces: 1, sucursal: 1},
        {id: 2, name: "cama", precio: 11500, marca: "olimpia", status: "nuevo", width: 70, length: 50, height: 50, color: "blanca", material: "madera", cantidad: 2, pieces: 2, sucursal: 1},
        {id: 3, name: "televisor", precio: 7500, marca: "samsung", status: "nuevo", width: 30, length: 3, height: 20, color: "negro", material: "plastico", cantidad: 2, pieces: 5, sucursal: 2},
        {id: 4, name: "mesa", precio: 2500, marca: "gibson", status: "usado", width: 30, length: 30, height: 50, color: "cafe", material: "madera", cantidad: 2, pieces: 1, sucursal: 2}
    ]

    public async getProducts(){
        const productsDb = await Product.findAll({});
        return productsDb;
    }

    async getProduct(id:number){
        const producto = this.productosDePrueba.find(valorActual => valorActual.id==id)
        if(!producto){
            return {code: 400, message: "este producto no existe"}
        }else{
            return {code: 200, message: producto}
        }
    }

    async buyProduct(id: number){
        const index = this.productosDePrueba.findIndex(valorActual => valorActual.id==id)
        if(!(index>=0)){
            return {code: 400, message: "indice no existente"}
        }

        if(this.productosDePrueba[index].cantidad==0){
            return {code: 400, message: "ya no hay stock de este producto"}
        }

        this.productosDePrueba[index].cantidad-=1
        return {code: 200, message: "elemento comprado"}

    }

    async modProduct(modProductDto: modProductDto, id: number){
        const actualizaciones = Object.entries(modProductDto)

        const producto = await this.getProduct(id)

        if(!(producto.code==200)){
            return {code:400, message: "este producto no existe"}
        }

        const indiceProducto = this.productosDePrueba.findIndex(valorActal => valorActal.id == id)
        
        actualizaciones.map((posicionActual) => {
            if(posicionActual[1]!=''){
                this.productosDePrueba[indiceProducto][`${posicionActual[0]}`] = posicionActual[1]
            }
        })

        return {code: 200, message: this.productosDePrueba[indiceProducto] }
    }
                  
}

export default new productsServices