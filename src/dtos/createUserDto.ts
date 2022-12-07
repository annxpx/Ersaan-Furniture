import {Length, IsNotEmpty, Min, Max, IsInt} from "class-validator";


export class createUserDto {
    @Length(3,30, {
        message: 'Username must be between 3 and 30 characters'
        })
    @IsNotEmpty()
    username: string

    @Length(7,30, {
    message: 'Password must be between 7 and 30 characters'})
    @IsNotEmpty()
    email: string

    @Length(4,15, {
    message: 'Password must be between 4 and 15 characters'})
    @IsNotEmpty()
    password: string
    
    @IsInt()
    @Min(0)
    @Max(1)
    type: number
    
    @Min(1,{
        message: 'Branch must be at least 1'})
    @IsNotEmpty()
    id_branches: number
}