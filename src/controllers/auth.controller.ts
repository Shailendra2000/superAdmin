import { Request, Response } from "express";
import { signInServices } from "../services";

export class loginController{
    private signInService; 
    constructor(){
        this.signInService = new signInServices()
    }
    public registerUser=async(req:Request,res:Response)=>{
        try{
            const { username , email , password } = req.body
            console.log(username,email,password)
            const response= await this.signInService.registerUserToDb(username,email,password)
            res.json(response)
        }
        catch(e:any){
            console.log(e);
            res.status(400).json({'message':e.message})
        }
    }
    public loginUser=async(req:Request,res:Response)=>{
        try{
            const { email }  = req.body
            const response= await this.signInService.signIn(email)
            res.json(response)
        }
        catch(e){
            console.log(e)
            res.status(500).json({'message':'invalid'})
        }
    }
}



