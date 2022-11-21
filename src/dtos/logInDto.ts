import { Length, IsNotEmpty  } from "class-validator";

export class LogInDto{
    @Length(7, 30, {message: "Hubo un error con el nombre especificado"})
    @IsNotEmpty()
    email: string

    @Length(1, 15, {message: "Hubo un error con la contraseña ingresada"})
    @IsNotEmpty()
    password: string
}