import { Request, Response, Router } from "express";
import { UserRepository } from "module/users/repositories/UserRepository";
import { AuthenticateUserController } from "module/users/useCases/authenticate/AuthenticateUserController";
import { AuthenticateUserUseCase } from "module/users/useCases/authenticate/AuthenticateUserUseCase";


const routerAuthenticateUser = Router();
const userRepository = new UserRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

routerAuthenticateUser.post('/user', (request:Request, response:Response)=>{
    authenticateUserController.handle(request,response);
});

export {routerAuthenticateUser}