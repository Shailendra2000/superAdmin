import { Request, Response } from "express";
import { IBody } from "../interfaces/signUpBodyInterace";
import { signUpServices } from "../services/signUpServices";
import { signInServices } from "../services/signInServices";

export class loginController{
    private signUpService;
    private signInService; 
    constructor(){
        this.signUpService = new signUpServices()
        this.signInService = new signInServices()
    }
    public registerUser=async(req:Request,res:Response)=>{
        try{
            const data:IBody=req.body;
            const userName=data.username
            const emailId=data.email
            const password=data.password
            if (password && emailId && userName){
                const response= await this.signUpService.registerUserToDb(userName,emailId,password)
                res.json(response)
            }
            else{
                res.status(400).json({'message':'enter all credentials carefully'})
            }
        }
        catch(e){
            res.status(500).json({'message':'some error occured'})
        }
    }
    public loginUser=async(req:Request,res:Response)=>{
        try{
            const data:IBody = req.body;
            const emailId = data.email
            if (emailId){
                const response= await this.signInService.signIn(emailId)
                res.json(response)
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            console.log(e)
            res.status(500).json({'message':'invalid'})
        }
    
    }
}



