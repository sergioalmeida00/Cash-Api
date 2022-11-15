import { Users } from "@prisma/client";
import { AppError } from "@shared/erros/AppError";
import { IUserRepository } from "../repositories/IUserRepository";
import { ICreateUserDTO } from "../UserDTO/ICreateUserDTO";
import { hash } from 'bcryptjs';


export class CreateUserUseCase{
    constructor(private userRepository:IUserRepository){}

    async execute({username,password}:ICreateUserDTO):Promise<void>{
        const userExists = await this.userRepository.findByUserName(username) ;
        if(userExists){
            throw new AppError("UserName already exists.");            
        }

        if(username.trim().length <= 3){
            throw new AppError("UserName must be at least 3 characters.");
        }

        const passwordHash = await hash(password,8);

        await this.userRepository.create({username,password:passwordHash });

    }
}