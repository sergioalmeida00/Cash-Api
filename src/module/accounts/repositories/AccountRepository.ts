import { Accounts } from "@prisma/client";
import { prismaDb } from "@shared/infra/prismaORM";
import { IAccountRepository } from "./IAccountRepository";

export class AccountRepository implements IAccountRepository{
    async getBalance(user_id: string): Promise<Accounts> {
        const responseUser = await prismaDb.accounts.findFirst({
            where:{
                User:{
                    id:user_id
                }
            }
        })

        return responseUser;

    }

}