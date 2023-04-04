import { Request, Response } from "express";
import { userListServices } from "../services/userListServices";

export class userController{
    private userListService
    constructor(){
        this.userListService = new userListServices()
    }
    public userList=async(req:Request,res:Response)=>{
        try{
            res.json(await this.userListService.returnUserList())
        }
        catch(e){   
            res.status(400).json({'message':'error'})
        }
    }
}

