import { ICreateUserDTO } from "@module/users/UserDTO/ICreateUserDTO";
import { Users } from "@prisma/client";
import { IUserRepository } from "../IUserRepository";
import { v4 as uuid } from 'uuid';

export class InMemoryUsersRepository implements IUserRepository{

    private users:Users[] =[];


    async create({username,password,account_id,id}: ICreateUserDTO): Promise<Users> {
       const user = {
            id:uuid(),
            username,
            password,
            account_id:uuid()
       }
       this.users.push(user);

       return user;
    }
    async findByUserName(username: string): Promise<Users> {
        return this.users.find(user => user.username === username);
    }
    async findByIdUser(user_id: string): Promise<Users> {
        return this.users.find(user => user.id === user_id);
    }

}