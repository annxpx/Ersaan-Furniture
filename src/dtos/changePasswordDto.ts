import { Length, IsNotEmpty } from "class-validator";

export class changePasswordDto{
    @Length(1,15, {message: "La contraseña no puede tener mas de 15 caracteres"})
    @IsNotEmpty()
    password: string
}