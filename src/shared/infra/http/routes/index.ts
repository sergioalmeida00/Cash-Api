import { Router } from "express";
import { routerAuthenticateUser } from "./authenticateUser.routes";
import { routeUser } from "./user.routes";


const router = Router();


router.use('/user',routeUser);
router.use('/auth',routerAuthenticateUser);


export {router}