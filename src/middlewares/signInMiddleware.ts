import { NextFunction, Request, Response } from "express";
import validator from "validator";
import { IBody } from "../interfaces/signUpBodyInterace";

export class signInMiddleware{
    public checkSignInCreds=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const data:IBody=req.body;
            const emailId=data.email
            const password=data.password
            if (password && emailId && validator.isEmail(emailId)){
                next()
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            res.status(400).json({'message':'failed'})
        }
    }
}