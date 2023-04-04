import { Request, Response } from "express";
import { taskStatusRepo } from "../repositories/taskStatusRepo";
import { taskServices } from "../services/TaskServices";

export class taskController{
    private taskService;
    private taskStatusRepository;
    constructor(){
        this.taskStatusRepository = new taskStatusRepo()
        this.taskService = new taskServices()
    }
    public userTasks=async(req:Request,res:Response)=>{
        try{
            const reqId=req.params.id 
            res.json(await this.taskService.fetchTasks(req.customParam.Email,reqId))
        }
        catch(e){
            res.status(400).json({'message':'no user'})
        }
    }
    public createUserTask=async(req:Request,res:Response)=>{
        try{
            const title=req.body.title
            const desc=req.body.desc
            const statusname=req.body.status
            const status=await this.taskStatusRepository.getStatusByName(statusname)
            if (status){
                res.json(await this.taskService.createTask(req.customParam.Email,title,desc,status))
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            res.status(400).json({'message':'failed'})
        }
    }

    public deleteUserTask = async(req:Request,res:Response)=>{
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

    public updateUserTask=async(req:Request,res:Response)=>{
        try{
            const title=req.body.title
            const desc=req.body.desc
            const statusname=req.body.status
            const taskId=req.body.taskId
            const status=await this.taskStatusRepository.getStatusByName(statusname)
            if (status){
                res.json(await this.taskService.updateTask(req.customParam.Email,title,desc,status,Number(taskId)))
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

