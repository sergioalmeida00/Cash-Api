import { Transactions } from "@prisma/client";
import { ITransactionDTO } from "../transactionDTO/ITransactionDTO";

interface ITransactionRepository{
    createTransaction(dataTransaction:ITransactionDTO):Promise<void>;
}

export {ITransactionRepository}