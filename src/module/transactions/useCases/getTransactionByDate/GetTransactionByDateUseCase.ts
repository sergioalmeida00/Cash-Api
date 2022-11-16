import { ITransactionRepository } from "@module/transactions/repositories/ITransactionRepository";
import { IGetTransactionByDateDTO } from "@module/transactions/transactionDTO/ITransactionDTO";
import { Transactions } from "@prisma/client";

export class GetTransactionByDateUseCase{
    constructor(
        private transactionRepository:ITransactionRepository
    ){}

    async execute({dateStart,dateEnd,account_id}:IGetTransactionByDateDTO):Promise<Transactions[]>{
        const responseTransaction = await this.transactionRepository.getTransactionByDate({dateStart,dateEnd,account_id});
        return responseTransaction;
    }
}