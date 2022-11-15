import { Request, Response, Router } from "express";
import { UserRepository } from "module/users/repositories/UserRepository";
import { CreateUserController } from "module/users/useCases/CreateUserController";
import { CreateUserUseCase } from "module/users/useCases/CreateUserUseCase";

const routeUser = Router();
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

routeUser.post('/create', (request:Request, response:Response) => {
    createUserController.handle(request,response);
});


export {routeUser}