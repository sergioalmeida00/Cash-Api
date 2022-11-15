import { Request, Response, Router } from "express";
import { AccountRepository } from "module/accounts/repositories/AccountRepository";
import { GetBalanceController } from "module/accounts/useCases/GetBalance/GetBalanceController";
import { GetBalanceUseCase } from "module/accounts/useCases/GetBalance/GetBalanceUseCase";
import { authenticateSessionUser } from "../middlwares/authenticateSessionUser";

const routeAccount = Router();

const accountRepository = new AccountRepository();
const getBalanceUseCase = new GetBalanceUseCase(accountRepository);
const getBalanceController = new GetBalanceController(getBalanceUseCase);

routeAccount.get('/balance', authenticateSessionUser, (request:Request, response:Response)=> {
    getBalanceController.handle(request,response);
});


export {routeAccount}