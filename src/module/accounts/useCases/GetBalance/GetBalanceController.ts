import { Request, Response } from "express";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

export class GetBalanceController{
    constructor(private getBalanceUseCase: GetBalanceUseCase){}

    async handle(request:Request, response:Response):Promise<Response>{
        const {id: user_id} = request.user;

        try {
            const responseBalanceUser = await this.getBalanceUseCase.execute(user_id);

            return response.status(201).json(responseBalanceUser);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}