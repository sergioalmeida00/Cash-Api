import { ITransactionRepository } from "@module/transactions/repositories/ITransactionRepository";
import { AppError } from "@shared/erros/AppError";
import { IAccountRepository } from "module/accounts/repositories/IAccountRepository";
import { IUserRepository } from "module/users/repositories/IUserRepository";

interface IRequest{
    userNameRecipient:string,
    amount:number,
    userSenderId:string
}

export class CreateTransactionUseCase{
    constructor(
        private userRepository:IUserRepository,
        private accountBalance:IAccountRepository,
        private transactionRepository:ITransactionRepository
    ){}
    
    async execute({userNameRecipient,amount,userSenderId}:IRequest){
        const responseUserSender = await this.userRepository.findByIdUser(userSenderId);
        
        if(responseUserSender.username === userNameRecipient){
            throw new AppError("Cannot transfer to same account.");
        }

        const responseUserRecipient = await this.userRepository.findByUserName(userNameRecipient);

        if(!responseUserRecipient){
            throw new AppError("User Recipient Invalid.");
        }

        const {balance} = await this.accountBalance.getBalance(userSenderId);

        if(amount > Number(balance)){
            throw new AppError("insufficient funds.");
        }


        await this.transactionRepository.createTransaction({
            userIdAccountSender: String(responseUserSender.account_id,),
            userIdAccountRecipient: String(responseUserRecipient.account_id),
            amount
        });
        
    }
}