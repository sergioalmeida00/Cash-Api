import { Accounts } from "@prisma/client";

interface IAccountRepository{
    getBalance(user_id:string):Promise<Accounts>;
}

export {IAccountRepository}