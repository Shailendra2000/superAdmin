import { AppDataSource } from "../dataSource"
import { TaskStatus } from "../entities"

export class taskStatusRepo{
    private repo 
    constructor(){
        this.repo = AppDataSource.getRepository(TaskStatus)
    }
    public getOneById=async(id:number)=>{
        return await this.repo.findOneBy({id:id})
    }
    public getOneByName=async(name:string)=>{
        return await this.repo.findOneBy({status:name})
    }
}