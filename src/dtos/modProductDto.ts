import { Length, IsNotEmpty } from "class-validator";


export class modProductDto {
    @Length(0,250, {message: "El nombre no puede ser mayor a 250 caracteres!"})
    name: string
    
    @Length(0,10, {message: "debe ingresar un precio para el producto valido!"})
    precio: number

    @Length(0,50, {message: "la marca no puede tener mas de 50 caracteres"})
    marca: string

    @Length(0,50, {message: "el estado no puede tener mas de 50 caracteres!"})
    status: string

    @Length(0,10, {message: "debe ingresar un ancho valido para el producto!"})
    width: number

    @Length(0,10, {message: "debe ingresar un largo valido para el producto!"})
    lenght: number

    @Length(0,10, {message: "debe ingresar un alto valido para el producto!"})
    height: number

    @Length(0,50, {message: "el color no puede tener mas de 50 caracteres"})
    color: string

    @Length(0,50, {message: "el material no puede tener mas de 50 caracteres!"})
    material: string

    @Length(0,10, {message: "debe ingresar una cantidad valida para el producto!"})
    cantidad: number

    @Length(0,10, {message: "debe ingresar una cantidad de piezas valida!"})
    pieces: number

    @Length(0,10, {message: "debe ingresar una sucursal valida!"})
    sucursal: number
}