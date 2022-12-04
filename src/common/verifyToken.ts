import * as jwt from 'jsonwebtoken'
import { Request, Response, Router,  } from "express";
import 'dotenv'

function verifyToken(req: Request, res: Response, next){
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(401).json({
            auth: false,
            message: "no token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.MY_SECRET_TOKEN)
        req.body.userAccessData = {userId: decoded.id, token}
        next()
    }
    catch{
        return res.status(406).json("el token provisto no es valido o ha expirado")
    }
}

export default verifyToken