import { AppError } from "@shared/erros/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';


interface IPayload {
    sub: string;
  }

export async function authenticateSessionUser(request:Request, response:Response, next:NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Missing Token.");
    }
    
    const[,token] = authHeader.split(" ");

    try {
        const {sub:user_id} = verify(token, `${process.env.SECRET}`) as IPayload;

        request.user = {
            id:user_id
        }

        next();
    } catch (error) {
        throw new AppError("Token Invalid.");
    }
}