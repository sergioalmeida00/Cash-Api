import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController{
    constructor(private authenticateUserUseCase:AuthenticateUserUseCase){}

    async handle(request:Request, response:Response):Promise<Response>{
        const {username,password} = request.body;

        try {
            const responseAuthUser = await this.authenticateUserUseCase.execute({username,password});

            return response.status(201).json(responseAuthUser);
        } catch (error) {
            return response.status(400).json(error);
        }
    }
}