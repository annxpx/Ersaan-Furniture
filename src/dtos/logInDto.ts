import { Length, IsNotEmpty  } from "class-validator";

export class LogInDto{
    @Length(7, 30, {
        message: 'email must be between 5 and 30 characters'})
    @IsNotEmpty()
    email: string

    @Length(8, 15, {
        message: 'Password must be between 8 and 15 characters'})
    @IsNotEmpty()
    password: string
}