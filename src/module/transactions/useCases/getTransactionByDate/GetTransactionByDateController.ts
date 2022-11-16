import { AppError } from "@shared/erros/AppError";
import { Request, Response } from "express";
import { GetTransactionByDateUseCase } from "./GetTransactionByDateUseCase";

export class GetTransactionByDateController{
    constructor(
        private getTransactionByDateUseCase:GetTransactionByDateUseCase
    ){}

    async handle(request:Request, response:Response):Promise<Response>{
        const {account_id} = request.user;
        const {dateStart,dateEnd} = request.body;

    
        const responseTransaction = await this.getTransactionByDateUseCase.execute({dateStart,dateEnd,account_id});

        return response.status(200).json(responseTransaction);
        
    }
}