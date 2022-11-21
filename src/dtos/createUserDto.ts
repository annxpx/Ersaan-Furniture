import { Length, IsNotEmpty } from "class-validator";


export class createUserDto {
    @Length(1,20, {message: "El nombre no puede ser mayor a 20 caracteres!"})
    @IsNotEmpty()
    name: string

    @Length(7,30, {message: "Debe ingresar un correo valido!"})
    @IsNotEmpty()
    email: string

    @Length(1,15, {message: "La contraseña no puede tener mas de 15 caracteres!"})
    @IsNotEmpty()
    password: string
}