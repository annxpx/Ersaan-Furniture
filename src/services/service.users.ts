import * as jwt from 'jsonwebtoken'
import 'dotenv'
class UsersServices{

    private usuariosDePrueba = [
        { id: 1, name: "Andrea", email: "andrea@gmail.com", password: "123", tipo: 0, sucursal: 1},
        { id: 2, name: "Sary", email: "sary@gmail.com", password: "hola", tipo: 0, sucursal: 2},
        { id: 3, name: "Erick", email: "Erick@gmail.com", password: "zanahoria", tipo: 1, sucursal: 2}
    ]

    public async getUsers(){
        const users = this.usuariosDePrueba
        return users
    }

    public async createUser(user){
        //ahora con estos datos añadimos el usuario en la base de datos, tabla usuarios
        const lastIndex = this.usuariosDePrueba.at(-1).id + 1   //aqui estoy generando el numero de ID      
        this.usuariosDePrueba.push({id: lastIndex, name: user.name, email: user.email, password: user.password, tipo: user.tipo, sucursal: user.sucursal})
        //---------------------------------------------------------------------------------------------------


        const token = jwt.sign({id: lastIndex}, process.env.MY_SECRET_TOKEN, {
            expiresIn: 60*60*24
        })

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

    
}

export default new UsersServices