import 'dotenv/config'
import { plainToClass } from "class-transformer";
import { Request, Response, Router } from "express";
import { validate } from "class-validator";
import { createUserDto } from "../dtos/createUserDto";
import Service from "../services/service";
import { LogInDto } from "../dtos/logInDto";
import { changePasswordDto } from "../dtos/changePasswordDto";
const jwt = require('jsonwebtoken')

function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET, {expiresIn: '5m'})
}

function validateToken(req, res, next){
    const accesToken = req.headers['authorization'] || req.query.accesstoken
    if(!accesToken) res.send('access denied')

    jwt.verify(accesToken,process.env.SECRET, (err, user)=>{
        if(err){
            res.send('Access denied, token expired or incorrect')
        }else{
            req.user=user
            next()
        }
    })
}

export class StoreController{
    router = Router()
    

    constructor(){
        this.initRoutes()
    }

    initRoutes(){
        this.router.get('/', (req, res)=>{ res.send('hola mundo') })
        this.router.get('/furniture', this.getList)
        this.router.get('/furniture/:id', this.getOne)
        this.router.get('/buyFurniture',validateToken, this.buyOne)
        this.router.get('/users', this.getUsers)
        this.router.post('/createUser', this.createUser)
        this.router.get('/login', this.logIn)
        this.router.post('/auth', this.sesionIniciada)
        this.router.post('/changePassword', this.changePassword)
    }

    async getList(req: Request, res: Response): Promise <Response>{
        const furnitureList = await Service.getFurniture()
        return res.json(furnitureList)
    }

    async getOne(req: Request, res: Response): Promise <Response>{
        const {id}= req.params;
        const furniture = await Service.getOneFurniture(+id);

        return res.json(furniture)
    }

    async buyOne(req, res: Response){
        res.json({
            username: req.user,
            informacion : 'esta pagina se accede con JWT, si ves esto es por que lo lograste'
        })
    }

    async getUsers(req: Request, res: Response): Promise <Response>{
        const usersList = await Service.getUsers()
        return res.json(usersList)
    }

    async createUser(req: Request, res: Response): Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(createUserDto, payload)
        const erros = await validate(contenidoPeticion)

        if(erros.length){
            return res.status(400).json({"validation-errors":erros})            
        }

        return res.json(await Service.createUser(contenidoPeticion))
    }

    logIn(req: Request, res: Response){
        /*
        const payload = req.body
        const contenidoPeticion = plainToClass(LogInDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            return res.status(400).json({"validation-errors": errors})
        }

        return res.json(await Service.logIn(contenidoPeticion))*/

        res.send(`<html>
                    <head>
                        <title>Login</title>
                    </head>
                    <body>
                        <form method="POST" action="/api/auth">
                            nombre de usuario: <input type="text" name="username"><br>
                            contraseña: <input type="password" name="password"><br>
                            <input type="submit" value="iniciar sesion">
                        </form>
                    </body>
                </html>
        `)
    }

    


    sesionIniciada(req: Request, res: Response){
        const {username, password} = req.body;
        
        console.log(req.body.username, username)
        //con esos datos consultamos a la base de datos para ver si existe

        const user = {username: username}
        const accesToken = generateAccessToken(user)

        res.header('authorization', accesToken).json({
            message: "usuario autenticado",
            token: accesToken
        })
    }

    async changePassword(req: Request, res: Response) : Promise <Response>{
        const payload = req.body
        const contenidoPeticion = plainToClass(changePasswordDto, payload)
        const errors = await validate(contenidoPeticion)

        if(errors.length){
            return res.status(400).json({"validation-errors": errors})
        }

        return res.json(await Service.changePassword(contenidoPeticion))
    }
}