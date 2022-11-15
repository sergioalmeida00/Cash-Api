import { Router } from "express";
import { routeAccount } from "./account.routes";
import { routerAuthenticateUser } from "./authenticateUser.routes";
import { routeUser } from "./user.routes";


const router = Router();


router.use('/user',routeUser);
router.use('/auth',routerAuthenticateUser);
router.use('/account',routeAccount);


export {router}