import { Router } from "express";
import { UserCOntroller } from "./controllers.user";
import { productsController } from "./controller.products";
import verifyToken from "./verifyToken";

export class StoreController{
    router = Router()
    userControllers : UserCOntroller
    productsControllers : productsController

    constructor(){
        this.userControllers = new UserCOntroller()
        this.productsControllers = new productsController()
        this.initRoutes()
    }

    initRoutes(){
        //peticion de uso practico
        this.router.get('/users', verifyToken, this.userControllers.getUsers)

        //peticiones de la aplicacion: usuarios
        this.router.post('/login', this.userControllers.logIn)
        this.router.post('/signup', this.userControllers.singUp)
        this.router.post('/changepass', verifyToken, this.userControllers.changePassword)

        //peticiones de la aplicacion: productos
        this.router.get('/products', verifyToken, this.productsControllers.getProducts)
        this.router.get('/product/:id', verifyToken, this.productsControllers.getProduct)
        this.router.delete('/buy/:id', verifyToken, this.productsControllers.buyProduct)
    }

}