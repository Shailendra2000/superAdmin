import { AppDataSource } from "../dataSource"
import { Task,TaskStatus,TaskStatusHistory,User } from "../entities"


export class taskHistoryRepo{
    private repo 
    constructor(){
        this.repo = AppDataSource.getRepository(TaskStatusHistory)
    }
    public add=async(task:Task,status:TaskStatus,user:User,from:TaskStatus)=>{
        const newUserTaskHsitory = this.repo.create()
        newUserTaskHsitory.toStatus=status;
        newUserTaskHsitory.task=task
        newUserTaskHsitory.user=user
        newUserTaskHsitory.fromStatus=from
        await this.repo.save(newUserTaskHsitory)   
    }
}