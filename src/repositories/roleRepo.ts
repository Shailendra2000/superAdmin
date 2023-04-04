import { AppDataSource } from "../dataSource"
import { Role } from "../entities/role"

export class roleRepo{
    private repo 
    constructor(){
        this.repo = AppDataSource.getRepository(Role)
    }
    public getRole=async(roleId:number)=>{
        return await this.repo.findOneBy({id:roleId})
    }
}