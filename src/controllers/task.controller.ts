import { Request, Response } from "express";
import { taskStatusRepo } from "../repositories";
import { taskServices } from "../services";

export class taskController{
    private taskService;
    private taskStatusRepository;
    constructor(){
        this.taskStatusRepository = new taskStatusRepo()
        this.taskService = new taskServices()
    }
    public get=async(req:Request,res:Response)=>{
        try{
            const reqId=req.params.id 
            res.json(await this.taskService.fetchTasks(req.customParam.Email,reqId))
        }
        catch(e){
            res.status(400).json({'message':'no user'})
        }
    }
    public create=async(req:Request,res:Response)=>{
        try{
            const title=req.body.title
            const desc=req.body.desc
            const statusname=req.body.status
            res.json(await this.taskService.createTask(req.customParam.Email,title,desc,statusname))
        }
        catch(e){
            res.status(400).json({'message':'failed'})
        }
    }

    public delete = async(req:Request,res:Response)=>{
        try{
            const taskId = req.body.taskId
            await this.taskService.deleteTask(req.customParam.Email,taskId)
            res.status(200).json({'message':'okay'})
        }
        catch(e){
            console.log(e)
            res.status(400).json({'message':'failed'})
        }
    }

    public update=async(req:Request,res:Response)=>{
        try{
            const title=req.body.title
            const desc=req.body.desc
            const statusname=req.body.status
            const taskId=req.body.taskId
            res.json(await this.taskService.updateTask(req.customParam.Email,title,desc,statusname,Number(taskId)))
            
        }
        catch(e){
            res.status(400).json({'message':'failed'})
        }
    }
}

