import * as jwt from 'jsonwebtoken'
import 'dotenv'
import provideToken from '../common/provideToken'
import {User} from "../models/users.models";

class UsersServices{

    private usuariosDePrueba = [
        { id: 1, name: "Andrea", email: "andrea@gmail.com", password: "123", tipo: 0, sucursal: 1},
        { id: 2, name: "Sary", email: "sary@gmail.com", password: "hola", tipo: 0, sucursal: 2},
        { id: 3, name: "Erick", email: "Erick@gmail.com", password: "zanahoria", tipo: 1, sucursal: 2}
    ]

    public async getUsers(){
        const usersDb = await User.findAll({});
        return usersDb
    }

    public async getOneUser(id: number){
        return this.usuariosDePrueba.find(valorActual=>valorActual.id==id)
    }

    public async createUser(user){
        // TODO: realizar esta accion con la base de datos en lugar del objeto usuariosPrueba
        //ahora con estos datos añadimos el usuario en la base de datos, tabla usuarios
        const lastIndex = this.usuariosDePrueba.at(-1).id + 1   //aqui estoy generando el numero de ID      
        this.usuariosDePrueba.push({id: lastIndex, name: user.name, email: user.email, password: user.password, tipo: user.tipo, sucursal: user.sucursal})
        //---------------------------------------------------------------------------------------------------


        const token = provideToken(lastIndex)

        return {auth: true, token}
    }

    public async logIn(login){
        const { email, password } = login
        const user = this.usuariosDePrueba.find(valorActual => valorActual.email == email)

        if(user && user.password == password){
            return user
        }else{
            return false
        }
    }

    public async changePassword(id){

    }

    
}

export default new UsersServices