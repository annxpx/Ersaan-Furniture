import * as jwt from 'jsonwebtoken'
import 'dotenv'
import provideToken from '../common/provideToken'
import {User} from "../models/users.models";
import {ResponseDto} from "../common/ResponseDto";
import { Branch } from '../models/branches.models';
import {createUserDto} from '../dtos/createUserDto';
import {ChangePassDto} from '../dtos/changePassDto';
import { TypeDto } from '../dtos/TypeDto';
import {createCipheriv, randomBytes, scrypt} from 'crypto';
import {promisify} from 'util';
import * as bcrypt from 'bcrypt';

class UsersServices{
    private responseDto: ResponseDto;


    public async encrypt(_password: string){
        const saltOrRounds = 10;
        const password = _password;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    public async comparePassword(_password: string, hash: string){
        const isMatch = await bcrypt.compare(_password, hash);
        return isMatch;
    }

    /*public async encrypt(_password: string){
        const iv = randomBytes(16);
        const password = 'prueba';

        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        
        const textToEncrypt = _password;
        const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return encryptedText;
    }

    public async Decrypt(_password: any){
        const iv = randomBytes(16);
        const password = 'prueba';

        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createCipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(_password),
            decipher.final(),
        ]);
        return decryptedText.toString;
    }*/

    public async getUsers(){
        this.responseDto = new ResponseDto();
        try{
            this.responseDto.data = await User.findAll({});
            this.responseDto.code = 200;
            this.responseDto.message = 'Listado de Usuarios de la base de datos';
            return this.responseDto;
        }catch(error){
            this.responseDto.code = 500;
            this.responseDto.message = 'Error en el servidor';
            console.log({error});
            return this.responseDto;
        }
    }

    public async getOneUser(req: Request){
        const token = req.headers['x-access-token'];
        try{
            const decoded = jwt.verify(token, process.env.MY_SECRET_TOKEN)
            return decoded.id;
        }catch{
            return {code: 400, message: "indice no existente"}
        }
    }


    public async createUser(createUserDto: createUserDto){
        this. responseDto = new ResponseDto();
        try {
            this.responseDto.data = User.create(createUserDto);
            this.responseDto.code = 201;
            this.responseDto.message = 'Usuario creado con exito';
        } catch (error) {
            this.responseDto.code = 500;
            this.responseDto.message = 'Error al crear el usuario';
            return this.responseDto;
            
        }
    }

    public async logIn(login){
        const { email, password } = login
        this.responseDto = new ResponseDto();
        const user = await User.findOne({where: {email}});
        console.log(this.responseDto.message);
        if(user && user.password == password){
            return user;
        }else{
            return false
        }
    }

    public async changePassword(newPassword: ChangePassDto, req: any){
        const id = await this.getOneUser(req);
        const encryptedPassword = await this.encrypt(newPassword.password);
        newPassword.password = encryptedPassword;
        console.log("new password "+ newPassword.password);
        if(!(id>=0)){
            return false;
        }
        const newPass = {
                id,
                ...newPassword
        };
        const updatePass = await User.update(newPass, {where:{id}});
        return true;
    }

    public async changeType( newType: TypeDto, req: any){
        const _id = await this.getOneUser(req);
        const userId = await User.findOne({where: req.param});
        const {id} = userId;
        if(!(_id>=0)){
            return false;
        }
        const userData = await User.findOne({where: _id});
        if(userData.type != 1){
            return false;
        }
        const updateType = {
                userId,
                ...newType
        };
        const updatedType = await User.update(updateType, {where: {id}});
        return true;
    }

    
}

export default new UsersServices