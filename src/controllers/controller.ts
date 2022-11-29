import { Router } from "express";
import { UserCOntroller } from "./controllers.user";
import verifyToken from "./verifyToken";

export class StoreController{
    router = Router()
    userControllers : UserCOntroller

    constructor(){
        this.userControllers = new UserCOntroller()
        this.initRoutes()
    }

    initRoutes(){
        //peticion de uso practico
        this.router.get('/users', verifyToken, this.userControllers.getUsers)

        //peticiones de la aplicacion
        this.router.post('/login', this.userControllers.logIn)
        this.router.post('/signup', this.userControllers.singUp)
    }

}