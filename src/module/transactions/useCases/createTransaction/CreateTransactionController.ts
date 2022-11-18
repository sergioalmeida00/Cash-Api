import { Request, Response } from "express";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionController{
    constructor(private createTransactionUseCase:CreateTransactionUseCase){}

    async handle(request:Request, response:Response):Promise<Response>{
        const {id: user_id} = request.user;
        const {username,amount} = request.body;

        try {
            const responseTransaction = await this.createTransactionUseCase.execute({
                userNameRecipient:username,
                amount, 
                userSenderId:user_id
            });

            return response.status(201).json(responseTransaction);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}