import { Router } from "express";
import { UserCOntroller } from "./controllers.user";
import { productsController } from "./controller.products";
import verifyToken from "../common/verifyToken";
import { branchesController } from "./controller.branches";

export class StoreController{
    router = Router()
    userControllers : UserCOntroller;
    productsControllers : productsController;
    branchesControllers : branchesController;

    constructor(){
        this.userControllers = new UserCOntroller();
        this.productsControllers = new productsController();
        this.branchesControllers = new branchesController();
        this.initRoutes()
    }

    initRoutes(){
        //peticion de uso practico
        this.router.get('/users', verifyToken, this.userControllers.getUsers)

        //peticiones de la aplicacion: usuarios
        this.router.post('/login', this.userControllers.logIn)
        this.router.post('/signup', this.userControllers.singUp)
        this.router.patch('/changepass', verifyToken, this.userControllers.changePassword)
        this.router.patch('/rol/:id', verifyToken, this.userControllers.changeType)
        
        //peticiones de la aplicacion: productos
        this.router.get('/products', verifyToken, this.productsControllers.getProducts)
        this.router.get('/product/:id', verifyToken, this.productsControllers.getProduct)
        this.router.post('/addProduct', verifyToken, this.productsControllers.createProduct)
        this.router.patch('/modproduct/:id', verifyToken, this.productsControllers.modProduct)
        this.router.delete('/deleteProduct/:id', verifyToken, this.productsControllers.deleteProduct)

        //peticiones de la aplicacion: sucursales
        this.router.get('/sucursales', verifyToken, this.branchesControllers.getBranches);
        this.router.get('/sucursal/:id', verifyToken, this.branchesControllers.getBranch);
        this.router.post('/addSucursal', verifyToken, this.branchesControllers.createBranch);
        this.router.patch('/modSucursal/:id', verifyToken, this.branchesControllers.updateBranch);
        this.router.delete('/deleteSucursal/:id', verifyToken, this.branchesControllers.deleteBranch);
    }

}