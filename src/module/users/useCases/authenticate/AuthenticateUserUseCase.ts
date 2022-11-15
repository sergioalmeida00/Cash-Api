import { AppError } from "@shared/erros/AppError";
import { IUserRepository } from "module/users/repositories/IUserRepository";
import { ICreateUserDTO } from "module/users/UserDTO/ICreateUserDTO";
import { compare } from 'bcryptjs';
import  {sign} from 'jsonwebtoken';

export class AuthenticateUserUseCase{

    constructor(private userRepository:IUserRepository){}

    async execute({username,password}:ICreateUserDTO){
        const responseUser = await this.userRepository.findByUserName(username);

        if(!responseUser){
            throw new AppError("UserName or password incorrect.");
        }

        const responsePasswordMatch = await compare(password, responseUser.passaword);

        if(!responsePasswordMatch){
            throw new AppError("UserName or password incorrect.");
        }

        const token = sign({username:responseUser.username}, `${process.env.SECRET}`,{
            subject:responseUser.id,
            expiresIn:'1d'
        });

        return {
            user:{
                id:responseUser.id,
                username:responseUser.username
            },
            token
        }
    }
}