import { AppDataSource } from "../dataSource"
import { Task } from "../entities/task"
import { TaskStatus } from "../entities/taskStatus"
import { TaskStatusHistory } from "../entities/taskStatusHistory"
import { User } from "../entities/user"

export class taskHistoryRepo{
    private repo 
    constructor(){
        this.repo = AppDataSource.getRepository(TaskStatusHistory)
    }
    public taskStatusHistory=async(task:Task,status:TaskStatus,user:User,from:TaskStatus)=>{
        console.log(from)
        const newUserTaskHsitory = this.repo.create()
        newUserTaskHsitory.toStatus=status;
        newUserTaskHsitory.task=task
        newUserTaskHsitory.user=user
        newUserTaskHsitory.fromStatus=from
        await this.repo.save(newUserTaskHsitory)   
    }
}