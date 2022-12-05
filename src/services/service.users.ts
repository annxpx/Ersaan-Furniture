import * as jwt from 'jsonwebtoken'
import 'dotenv'
import provideToken from '../common/provideToken'
import {User} from "../models/users.models";
import {ResponseDto} from "../common/ResponseDto";
import { Branch } from '../models/branches.models';
import {createUserDto} from '../dtos/createUserDto';
import {ChangePassDto} from '../dtos/changePassDto';
import {ChangeTypeDto} from "../dtos/changeTypeDto";

class UsersServices{
    private responseDto: ResponseDto;

    private usuariosDePrueba = [
        { id: 1, name: "Andrea", email: "andrea@gmail.com", password: "123", tipo: 0, sucursal: 1},
        { id: 2, name: "Sary", email: "sary@gmail.com", password: "hola", tipo: 0, sucursal: 2},
        { id: 3, name: "Erick", email: "Erick@gmail.com", password: "zanahoria", tipo: 1, sucursal: 2}
    ]

    public async getUsers(){
        this.responseDto = new ResponseDto();
        try{
            this.responseDto.data = await User.findAll({});
            this.responseDto.code = 200;
            this.responseDto.message = 'Listado de Usuarios de la base de datos';
            return this.responseDto;
        }catch(error){
            this.responseDto.code = 500;
            this.responseDto.message = 'Error en el servidor';
            console.log({error});
            return this.responseDto;
        }
    }

    public async getOneUser(req: Request){
        const token = req.headers['x-access-token']
        try{
            const decoded = jwt.verify(token, process.env.MY_SECRET_TOKEN)
            return decoded.id;
        }catch{
            return {code: 400, message: "indice no existente"}
        }
    }
    

    public async createUser(createUserDto: createUserDto){
        // TODO: realizar esta accion con la base de datos en lugar del objeto usuariosPrueba
        //ahora con estos datos añadimos el usuario en la base de datos, tabla usuarios
        this. responseDto = new ResponseDto();
        try {
            //const token = provideToken(lastIndex)
            //return {auth: true, token}
            this.responseDto.data = User.create(createUserDto);
            this.responseDto.code = 201;
            this.responseDto.message = 'Usuario creado con exito';
        } catch (error) {
            /*if(error.parent.code == '23505'){
                this.responseDto.code=400;
                this.responseDto.message= 'No se puede crear un usuario repetido';
                return this.responseDto;
            }*/
            this.responseDto.code = 500;
            this.responseDto.message = 'Error al crear el usuario';
            return this.responseDto;
            
        }
        /*const lastIndex = this.usuariosDePrueba.at(-1).id + 1   //aqui estoy generando el numero de ID      
        this.usuariosDePrueba.push({id: lastIndex, name: user.name, email: user.email, password: user.password, tipo: user.tipo, sucursal: user.sucursal})
        const token = provideToken(lastIndex)

        return {auth: true, token}*/
    }

    public async logIn(login){
        const { email, password } = login
        this.responseDto = new ResponseDto();
        const user = await User.findOne({where: {email}});
        console.log(this.responseDto.message);
        if(user && user.password == password){
            return user;
        }else{
            return false
        }
    }
    public async changeType(newType: ChangeTypeDto, req: any, res: Response) {
        const id = await this.getOneUser(req);
        if (id === 0) {
            this.responseDto = new ResponseDto();
            this.responseDto.code = 400;
            this.responseDto.message = 'No se puede cambiar el tipo de usuario';
            return this.responseDto;
        }
            const new = {
                id,
                ...newType
            };
            const updateType = await User.update(new, {where: {type}});
            return true;
        
    }
    public async changePassword(newPassword: ChangePassDto, req: any){
        const id = await this.getOneUser(req);
        if(!(id>=0)){
            return false;
        }
        const newPass = {
                id,
                ...newPassword
        };
        const updatePass = await User.update(newPass, {where:{id}});
        return true;
    }

    
}

export default new UsersServices