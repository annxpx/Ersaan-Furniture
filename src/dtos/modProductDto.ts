import {Length, IsInt, Max, Min} from "class-validator";

export class modProductDto {
    @Length(0,250, {
        message: 'Name must be less than 250 characters'
    })
    productName: string
    
    @IsInt()
    @Min(20)
    @Max(99999)
    price: number

    @Length(0,50, {
        message: 'Brand must be less than 50 characters'
    })
    brand: string

    @Length(5,20, {
        message: 'Status must be between 5 and 20 characters'
    })
    status: string
    
    @IsInt()
    @Min(0)
    @Max(100)
    width: number

    @IsInt()
    @Min(1)
    @Max(100)
    length: number

    @IsInt()
    @Min(1)
    @Max(100)
    height: number

    @Length(3,50, {
        message: 'Color must be less than 50 characters'
    })
    color: string

    @Length(3,50, {
        message: 'Material must be less than 50 characters'
    })
    material: string

    @IsInt()
    @Min(1)
    @Max(200)
    quantity: number

    @IsInt()
    @Min(1)
    @Max(20)
    pieces: number

   //@Length(0,10, {message: "debe ingresar una sucursal valida!"})
    id_branches: number
}