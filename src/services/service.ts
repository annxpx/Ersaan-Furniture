

class Service{

    private productosDePrueba = [
        { id: 1, name: "silon", precio: 5000, status: "new", sucursal: 1},
        { id: 2, name: "armario", precio: 15000, status: "usado", sucursal: 2},
        { id: 3, name: "espejo", precio: 1400, status: "new", sucursal: 2}
    ]

    private productosDePruebaUsuarios = [
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
        const users = this.productosDePruebaUsuarios
        return users
    }

}

export default new Service()