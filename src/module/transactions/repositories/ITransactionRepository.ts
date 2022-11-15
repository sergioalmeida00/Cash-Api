import { Transactions } from "@prisma/client";
import { ITransactionDTO } from "../transactionDTO/ITransactionDTO";

interface ITransactionRepository{
    createTransaction(dataTransaction:ITransactionDTO):Promise<void>;
    getTransactionAccountId(accountUserId:string):Promise<Transactions[]>;
}

export {ITransactionRepository}