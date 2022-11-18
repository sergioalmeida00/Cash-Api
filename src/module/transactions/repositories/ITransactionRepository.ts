import { Transactions } from "@prisma/client";
import { IGetTransactionByDateDTO, ITransactionDTO } from "../transactionDTO/ITransactionDTO";

interface ITransactionRepository{
    createTransaction(dataTransaction:ITransactionDTO):Promise<Transactions>;
    getTransactionAccountId(accountUserId:string):Promise<Transactions[]>;
    getTransactionByDate({dateStart,dateEnd}:IGetTransactionByDateDTO):Promise<Transactions[]>;
}

export {ITransactionRepository}