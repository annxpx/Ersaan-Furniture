import {Length, IsNotEmpty, MIN, MAX} from "class-validator";


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
/*
    @MIN(0)
    @MAX(1)
    type: number
    */
   /* @MIN(1,{
        message: 'Branch must be at least 1'})
    @MAX(10,{
        message: 'Branch must be at most 10'})
    @IsNotEmpty()
    id_branches: number*/
}