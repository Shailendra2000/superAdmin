import { Request, Response } from "express";
import { userListServices } from "../services";

export class userController{
    private userListService
    constructor(){
        this.userListService = new userListServices()
    }
    public get=async(req:Request,res:Response)=>{
        try{
            res.json(await this.userListService.returnUserList())
        }
        catch(e){   
            res.status(400).json({'message':'error'})
        }
    }
}

