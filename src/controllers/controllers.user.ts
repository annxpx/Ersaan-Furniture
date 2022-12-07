import {plainToClass} from "class-transformer";
import {Request, Response} from "express";
import {validate} from "class-validator";
import {createUserDto} from "../dtos/createUserDto";
import {ChangePassDto} from "../dtos/changePassDto";
import UserServices from "../services/service.users";
import {LogInDto} from "../dtos/logInDto";
import serviceUsers from "../services/service.users";
import provideToken from "../common/provideToken";
import {TypeDto} from '../dtos/TypeDto';

export class UserCOntroller {

  async logIn(req: Request, res: Response): Promise<Response> {
    const payload = req.body

    const contenidoPeticion = plainToClass(LogInDto, payload)
    const errors = await validate(contenidoPeticion)

    if (errors.length) {
      console.log(errors);
      return res.status(400).json("errores en los datos de inicio de sesion")
    }

    const usuario = await serviceUsers.logIn(contenidoPeticion)

    if (!usuario) {
      return res.status(401).json("Email o contraseña no validos")
    }

    const token = provideToken(usuario.id)

    return res.json({auth: true, token})
  }

  async singUp(req: Request, res: Response): Promise<Response> {
    const payload = req.body
    payload.type = 0;

    const contenidoPeticion = plainToClass(createUserDto, payload)
    const errors = await validate(contenidoPeticion)

    if (errors.length) {
      console.log(errors)
      return res.status(400).json("Error en los datos enviados")
    }

    return res.status(200).json(await serviceUsers.createUser(contenidoPeticion))
  }

  //este metodo solo es accesible si el usuario tiene token---------------------
  async getUsers(req: Request, res: Response): Promise<Response> {
    const {userAccessData} = req.body
    const usersList = await UserServices.getUsers()
    return res.json({usersList, solicitante: userAccessData})
  }

  //este metodo solo es accesible si el usuario tiene token---------------------
  async changePassword(req: Request, res: Response): Promise<Response> {
    const payload = plainToClass(ChangePassDto, req.body);
    const resultadoPeticion = await UserServices.changePassword(payload, req);
    if (!resultadoPeticion) {
      return res.status(400).json("No se pudo cambiar la contraseña")
    }
    return res.status(200).json("contraseña guardada")
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    let result = await UserServices.deleteUser(+id, req.headers);
    if (!result) {
      return res.status(400).json({"message": "No se pudo eliminar el usuario seleccionado"});
    }
    return res.status(200).json({"message": "Usuario eliminado con exito"});
  }

  async changeType(req: Request, res: Response): Promise<Response> {
    const payload = plainToClass(TypeDto, req.body);
    const resultadoPeticion = await UserServices.changeType(payload, req);
    if (!resultadoPeticion) {
      return res.status(400).json("No se pudo cambiar el rol")
    }
    return res.status(200).json("Rol cambiado con exito")
  }

}