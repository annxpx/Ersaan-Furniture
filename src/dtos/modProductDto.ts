import {Length, IsNotEmpty, MAX, MIN} from "class-validator";

export class modProductDto {
    @Length(0,250, {
        message: 'Name must be less than 250 characters'
    })
    productName: string

    @MIN(20)
    @MAX(4000)
    price: number

    @Length(0,50, {
        message: 'Brand must be less than 50 characters'
    })
    brand: string

    @Length(5,20, {
        message: 'Status must be between 5 and 20 characters'
    })
    status: string
    @MIN(0)
    @MAX(4)
    width: number

    @MIN(0)
    @MAX(4)
    lenght: number

    @MIN(0)
    @MAX(4)
    height: number

    @Length(3,50, {
        message: 'Color must be less than 50 characters'
    })
    color: string

    @Length(3,50, {
        message: 'Material must be less than 50 characters'
    })
    material: string

    @MIN(1)
    @MAX(200)
    quantity: number

    @MIN(1)
    @MAX(20)
    pieces: number

   /* @Length(0,10, {message: "debe ingresar una sucursal valida!"})
    sucursal: number*/
}