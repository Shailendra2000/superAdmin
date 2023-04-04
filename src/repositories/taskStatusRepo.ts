import { AppDataSource } from "../dataSource"
import { TaskStatus } from "../entities/taskStatus"

export class taskStatusRepo{
    private repo 
    constructor(){
        this.repo = AppDataSource.getRepository(TaskStatus)
    }
    public getStatusById=async(id:number)=>{
        return await this.repo.findOneBy({id:id})
    }
    public getStatusByName=async(name:string)=>{
        return await this.repo.findOneBy({status:name})
    }
}