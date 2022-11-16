import { Users } from "@prisma/client";
import { AppError } from "@shared/erros/AppError";
import { hash } from 'bcryptjs';
import { ICreateUserDTO } from "@module/users/UserDTO/ICreateUserDTO";
import { IUserRepository } from "@module/users/repositories/IUserRepository";


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

        if(!CreateUserUseCase.CheckPassword(password)){
            throw new AppError("Password must have at least one uppercase letter and 8 digits.");
        }

        const passwordHash = await hash(password,8);

        await this.userRepository.create({username,password:passwordHash });
    }

    static CheckPassword(password:string):Boolean{
        const rulePassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,15}$/;

        if(password.match(rulePassword)){
            return true;
        }else{
            return false;
        }
    }
}