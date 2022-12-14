import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController{
    constructor(private createUserUseCase:CreateUserUseCase){}

    async handle(request:Request, response:Response):Promise<Response>{
        const {username, password} = request.body;
        try {
            await this.createUserUseCase.execute({username,password});

            return response.status(201).send()
        } catch (error) {
            return response.status(400).json(error)
        }
    }
}