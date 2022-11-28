import { changePasswordDto } from "../dtos/changePasswordDto"
import { createUserDto } from "../dtos/createUserDto"
import { LogInDto } from "../dtos/logInDto"

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

    
}

export default new UsersServices