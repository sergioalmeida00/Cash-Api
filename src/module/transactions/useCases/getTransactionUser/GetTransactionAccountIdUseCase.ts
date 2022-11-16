import { Transactions } from "@prisma/client";
import { AppError } from "@shared/erros/AppError";
import { ITransactionRepository } from "module/transactions/repositories/ITransactionRepository";
import { IUserRepository } from "@module/users/repositories/IUserRepository"

export class GetTransactionAccountIdUseCase{
    constructor (
        private transactionRepository:ITransactionRepository,
        private userRepository:IUserRepository
    ){}

    async execute(user_id:string):Promise<Transactions[]>{

        const responseUser = await this.userRepository.findByIdUser(user_id);

        const responseTransactionAccountIdUser = await this.transactionRepository.getTransactionAccountId(responseUser.account_id);

        if(!responseTransactionAccountIdUser){
            throw new AppError("No Existing Transaction.",400);
        }
        return responseTransactionAccountIdUser;
    }
}