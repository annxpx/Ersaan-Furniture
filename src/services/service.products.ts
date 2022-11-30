import * as jwt from 'jsonwebtoken'
import 'dotenv'

class productsServices{

    productosDePrueba = [
        {id: 1, name: "sillon", precio: 500, marca: "gibson", status: "nuevo", width: 30, length: 30, height: 50, color: "negro", material: "madera", sucursal: 1},
        {id: 2, name: "cama", precio: 11500, marca: "olimpia", status: "nuevo", width: 70, length: 50, height: 50, color: "blanca", material: "madera", sucursal: 1},
        {id: 3, name: "televisor", precio: 7500, marca: "samsung", status: "nuevo", width: 30, length: 3, height: 20, color: "negro", material: "plastico", sucursal: 2},
        {id: 4, name: "mesa", precio: 2500, marca: "gibson", status: "usado", width: 30, length: 30, height: 50, color: "cafe", material: "madera", sucursal: 2}
    ]

    async getProducts(){
        const products = this.productosDePrueba

        return products
    }

    async getProduct(id:number){
        const producto = this.productosDePrueba.find(valorActual => valorActual.id==id)

        return producto
    }

    async buyProduct(id: number){
        const index = this.productosDePrueba.findIndex(valorActual => valorActual.id==id)
        if(!(index>=0)){
            return {respuesta: false, message: "indice no existente"}
        }

        delete this.productosDePrueba[index]

        return {respuesta: true, message: "elemento comprado"}

    }
                  
}

export default new productsServices