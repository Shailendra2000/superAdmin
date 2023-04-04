import { AppDataSource } from "../dataSource"
import { Task } from "../entities/task"
import { TaskStatus } from "../entities/taskStatus"
import { User } from "../entities/user"

export class taskRepo{
    private repo
    constructor(){
        this.repo=AppDataSource.getRepository(Task)
    }
    public createUserTask=async(user:User,title:string,desc:string,status:TaskStatus)=>{
        let date_ob = new Date();
        const newTask = this.repo.create()
        newTask.title=title
        newTask.createdAt=date_ob
        newTask.createdBy=user
        newTask.desc=desc
        newTask.status=status
        newTask.isActive=true
        return await this.repo.save(newTask)
    }
    public deleteTask = async(taskID:number)=>{
        await this.repo.update({id:taskID},{isActive:false})
    }
    public getUserTask = async (taskId:number)=>{
        return await this.repo.findOneBy({id:taskId})
    }
    public updateTask = async (taskId:number,title:string,desc:string,status:TaskStatus,user:User)=>{
        let date_ob = new Date();
        await this.repo.update({id:taskId},{title:title,desc:desc,status:status,updatedBy:user,updatedAt:date_ob})
        
    }
}