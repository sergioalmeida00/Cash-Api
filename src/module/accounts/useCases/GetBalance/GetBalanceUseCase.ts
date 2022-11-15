import { IAccountRepository } from "module/accounts/repositories/IAccountRepository";

export class GetBalanceUseCase{
    constructor(private accountRepository:IAccountRepository){}

    async execute(user_id:string){
        const responseUserBalance = await this.accountRepository.getBalance(user_id);

        return responseUserBalance;
    }
}