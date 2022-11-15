import { GetTransactionAccountIdController } from "@module/transactions/useCases/getTransactionUser/GetTransactionAccountIdController";
import { GetTransactionAccountIdUseCase } from "@module/transactions/useCases/getTransactionUser/GetTransactionAccountIdUseCase";
import { Request, Response, Router } from "express";
import { AccountRepository } from "module/accounts/repositories/AccountRepository";
import { TransactionRepository } from "module/transactions/repositories/TransactionRepository";
import { CreateTransactionController } from "module/transactions/useCases/CreateTransactionController";
import { CreateTransactionUseCase } from "module/transactions/useCases/CreateTransactionUseCase";
import { UserRepository } from "module/users/repositories/UserRepository";
import { authenticateSessionUser } from "../middlwares/authenticateSessionUser";

const routeTransaction = Router();

const accountRepository = new AccountRepository();
const userRepository = new UserRepository();
const transactionRepository = new TransactionRepository();
const createTransactionUseCase = new CreateTransactionUseCase(userRepository,accountRepository,transactionRepository);
const createTransactionController = new CreateTransactionController(createTransactionUseCase);

const getTransactionAccountIdUseCase = new GetTransactionAccountIdUseCase(transactionRepository,userRepository);
const getTransactionAccountIdController = new GetTransactionAccountIdController(getTransactionAccountIdUseCase);


routeTransaction.post('/create',authenticateSessionUser, (request:Request, response:Response) => {
    createTransactionController.handle(request,response);
});

routeTransaction.get('/list',authenticateSessionUser,(request:Request, response:Response) => {
    getTransactionAccountIdController.handle(request,response);
});

export {routeTransaction}