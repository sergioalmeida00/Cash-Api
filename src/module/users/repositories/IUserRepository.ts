import { Users } from "@prisma/client";
import { ICreateUserDTO } from "../UserDTO/ICreateUserDTO";

interface IUserRepository{
    create(data:ICreateUserDTO):Promise<void>;
    findByUserName(username:string):Promise<Users>;
}

export {IUserRepository}