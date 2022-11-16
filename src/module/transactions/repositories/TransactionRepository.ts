import { Transactions } from "@prisma/client";
import { prismaDb } from "@shared/infra/prismaORM";
import { IGetTransactionByDateDTO, ITransactionDTO } from "../transactionDTO/ITransactionDTO";
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

    async getTransactionAccountId(accountUserId: string): Promise<Transactions[]> {
        const responseTransactionAccountIdUser = await prismaDb.transactions.findMany({
            where:{
                OR:[
                    {credited_account_id:accountUserId},
                    {debited_account_id:accountUserId}
                ]
            },            
            include:{
                AccountDebited:{
                    select:{
                        User:{
                            select:{
                                username:true
                            }
                        }
                    }
                },
                AccountCredited:{
                    select:{
                        User:{
                            select:{
                                username:true
                            }
                        }
                    }
                }   
            },
            orderBy:{
                created_at:'desc'
            }
        });

        return responseTransactionAccountIdUser;
    }
    
    async getTransactionByDate({ dateStart, dateEnd, account_id}: IGetTransactionByDateDTO): Promise<Transactions[]> {
        const responseTransaction = prismaDb.$queryRaw<Transactions[]>`
                SELECT
                *
                FROM
                transaction
                WHERE
                (
                    credited_account_id = ${account_id}
                    OR debited_account_id = ${account_id}
                )
                AND created_at::date BETWEEN ${new Date(dateStart)} AND ${new Date(dateEnd)}`;
        return responseTransaction;
    }
}
