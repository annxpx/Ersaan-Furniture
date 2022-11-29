import { Length, IsNotEmpty  } from "class-validator";

export class LogInDto{
    @Length(5, 30, {message: "Hubo un error con el email especificado, demasiados caracteres o muy pocos"})
    @IsNotEmpty()
    email: string

    @Length(1, 15, {message: "Hubo un error con la contraseña ingresada,  demasiados caracteres o muy pocos"})
    @IsNotEmpty()
    password: string
}