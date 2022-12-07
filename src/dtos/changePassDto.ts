import {Length, IsNotEmpty} from "class-validator";

export class ChangePassDto {

  @Length(1, 15, {message: "Hubo un error con la contraseña ingresada,  demasiados caracteres o muy pocos"})
  @IsNotEmpty()
  password: string
}