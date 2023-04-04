import { AppDataSource } from "../dataSource";
import { Task } from "../entities/task";
import { User } from "../entities/user";
import { UserTaskMapping } from "../entities/userTaskMapping";

export class UserTaskMapRepo{
    private repo;
    constructor(){
        this.repo=AppDataSource.getRepository(UserTaskMapping)
    }
    public userTaskMapping=async(task:Task,user:User)=>{
        const newUserTaskMapping = this.repo.create()
        newUserTaskMapping.task=task
        newUserTaskMapping.user=user
        await this.repo.save(newUserTaskMapping)   
    }
    public getUserTask=async(user:User)=>{
        return await this.repo.find({where:{user:user},relations:{task:true}})
    }
}