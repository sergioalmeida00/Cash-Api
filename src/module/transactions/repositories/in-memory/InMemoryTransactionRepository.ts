import { ITransactionDTO, IGetTransactionByDateDTO } from "@module/transactions/transactionDTO/ITransactionDTO";
import { Transactions } from "@prisma/client";
import { ITransactionRepository } from "../ITransactionRepository";

export class InMemoryTransactionRepository implements ITransactionRepository{

    private transactionsMemory:Transactions[] = [];

    async createTransaction({userIdAccountRecipient,amount,userIdAccountSender}: ITransactionDTO): Promise<void> {
        
    }
    async getTransactionAccountId(accountUserId: string): Promise<Transactions[]> {
        throw new Error("Method not implemented.");
    }
    async getTransactionByDate({ dateStart, dateEnd }: IGetTransactionByDateDTO): Promise<Transactions[]> {
        throw new Error("Method not implemented.");
    }

}