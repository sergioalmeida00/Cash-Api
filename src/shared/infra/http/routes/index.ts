import { Router } from "express";
import { routeAccount } from "./account.routes";
import { routerAuthenticateUser } from "./authenticateUser.routes";
import { routeTransaction } from "./transaction.routes";
import { routeUser } from "./user.routes";


const router = Router();


router.use('/user',routeUser);
router.use('/auth',routerAuthenticateUser);
router.use('/account',routeAccount);
router.use('/transaction',routeTransaction);


export {router}