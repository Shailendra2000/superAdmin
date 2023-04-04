import { AppDataSource } from "../dataSource"
import { Role } from "../entities"

export class roleRepo{
    private repo 
    constructor(){
        this.repo = AppDataSource.getRepository(Role)
    }
    public getOneById=async(roleId:number)=>{
        return await this.repo.findOneBy({id:roleId})
    }
}