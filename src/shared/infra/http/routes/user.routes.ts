import { CreateUserController } from "@module/users/useCases/createUser/CreateUserController";
import { CreateUserUseCase } from "@module/users/useCases/createUser/CreateUserUseCase";
import { Request, Response, Router } from "express";
import { UserRepository } from "module/users/repositories/UserRepository";


const routeUser = Router();
const userRepository = new UserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

routeUser.post('/create', (request:Request, response:Response) => {
    createUserController.handle(request,response);
});


export {routeUser}