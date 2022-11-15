import { prismaDb } from "@shared/infra/prismaORM";
import { ITransactionDTO } from "../transactionDTO/ITransactionDTO";
import { ITransactionRepository } from "./ITransactionRepository";

export class TransactionRepository implements ITransactionRepository{
    async createTransaction({ userIdAccountSender, userIdAccountRecipient, amount}: ITransactionDTO): Promise<void> {
          await prismaDb.$transaction([
            prismaDb.accounts.update({
                data:{balance:{decrement:Number(amount)}},
                where:{id:userIdAccountSender},
                include:{
                    TransactionsDebited:true
                }
            }),
            prismaDb.accounts.update({
                data:{
                    balance:{increment:Number(amount)},                 
                 },
                where:{id:userIdAccountRecipient}
            }),
            prismaDb.transactions.create({
                data:{
                    value:Number(amount),
                    credited_account_id:userIdAccountRecipient,
                    debited_account_id:userIdAccountSender
                }   
            })
        ]);
    }
    
}
