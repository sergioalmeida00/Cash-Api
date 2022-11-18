import { AppError } from "@shared/erros/AppError";
import { Request, Response } from "express";
import { GetTransactionAccountIdUseCase } from "./GetTransactionAccountIdUseCase";

export class GetTransactionAccountIdController{
    constructor(private getTransactionAccountIdUseCase:GetTransactionAccountIdUseCase){}

    async handle(request:Request, response:Response):Promise<Response>{
        const {id:user_id} = request.user;

        try {
            const responseTransactionAccount = await this.getTransactionAccountIdUseCase.execute(user_id);

            return response.status(200).json(responseTransactionAccount);
        } catch (error) {
            throw new AppError(error);
        }

    }
}