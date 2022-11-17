import { Users } from "@prisma/client";
import { ICreateUserDTO } from "../UserDTO/ICreateUserDTO";

interface IUserRepository{
    create(data:ICreateUserDTO):Promise<Users>;
    findByUserName(username:string):Promise<Users>;
    findByIdUser(user_id:string):Promise<Users>;
}

export {IUserRepository}