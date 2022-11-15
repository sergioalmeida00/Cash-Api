import { Users } from "@prisma/client";
import { prismaDb } from "@shared/infra/prismaORM";
import { ICreateUserDTO } from "../UserDTO/ICreateUserDTO";
import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository{

    async create({username,password}: ICreateUserDTO): Promise<void> {
        await prismaDb.users.create({
            data:{
                username,
                password,
                account:{
                    create:{
                        balance:100
                    }
                }
            }
        });
    }

    async findByUserName(username: string): Promise<Users> {
        const responseUsername = await prismaDb.users.findUnique({
            where:{
                username
            }
        });

        return responseUsername;
    }

    async findByIdUser(user_id: string): Promise<Users> {
        const responseUser = await prismaDb.users.findUnique({
            where:{
                id:user_id
            }
        });

        return responseUser;
    }   

}