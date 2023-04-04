import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from "express"
import { IBody } from "../interfaces/signUpBodyInterace";
import { userRepo } from '../repositories/userRepo';

export class verifyAccountMiddleware{
    
    private userRepository
    
    constructor(){
        this.userRepository = new userRepo() 
    }
    public verifyAccount=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const data:IBody=req.body;
            const email=data.email
            const password=data.password
            const userPassword=await this.userRepository.getUserPassword( email ) as string
    
            if( await bcrypt.compare(password,userPassword) ){
                next()
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            res.status(400).json({'message':'invalid'})
        }
    }
}
