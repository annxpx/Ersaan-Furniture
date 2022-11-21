import { createUserDto } from "../dtos/createUserDto"
import { LogInDto } from "../dtos/logInDto"


class Service{

    private productosDePrueba = [
        { id: 1, name: "silon", precio: 5000, status: "new", sucursal: 1},
        { id: 2, name: "armario", precio: 15000, status: "usado", sucursal: 2},
        { id: 3, name: "espejo", precio: 1400, status: "new", sucursal: 2}
    ]

    private usuariosDePrueba = [
        { id: 1, name: "Andrea", email: "andrea@gmail.com", password: "123"},
        { id: 2, name: "Sary", email: "sary@gmail.com", password: "hola"},
        { id: 3, name: "Erick", email: "Erick@gmail.com", password: "zanahoria"}
    ]

    public async getFurniture(){
        const productos = this.productosDePrueba
        return productos
    }

    public async getOneFurniture(id: number){
        const furniture = this.productosDePrueba.find((valorActual => valorActual.id===id))
        if(furniture){
            return furniture
        }else{
            return "No se encontro ningun producto con ese ID";
        }
    }

    public async getUsers(){
        const users = this.usuariosDePrueba
        return users
    }

    public async createUser(userData : createUserDto){
        const indice = this.usuariosDePrueba.length + 1
        this.usuariosDePrueba.push({id: indice, name: userData.name, email: userData.email, password: userData.password})
        
        return this.usuariosDePrueba
    }

    public async logIn(logInData : LogInDto){
        const usuario = this.usuariosDePrueba.find(valorActual => valorActual.email===logInData.email)
        if(usuario){
            if(usuario.password === logInData.password){
                return `has iniciado sesion con ${usuario.name}`
            }else{
                return "contraseña incorrecta"
            }
        }else{
            return "El correo proporcionado no se encuentra en la base de datos"
        }
    }

}

export default new Service()