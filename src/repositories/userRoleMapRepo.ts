import { AppDataSource } from "../dataSource";
import { Role } from "../entities/role";
import { User } from "../entities/user";
import { UserRoleMapping } from "../entities/userRoleMapping";
import { roleRepo } from "./roleRepo";
import { userRepo } from "./userRepo";

export class userRoleRepo{
    private repo;
    private userRepository;
    private roleRepository;
    constructor(){
        this.repo = AppDataSource.getRepository(UserRoleMapping)
        this.userRepository = new userRepo()
        this.roleRepository = new roleRepo()
    }

    public getUserRoles=async(user:User)=>{
        return await this.repo.find({where:{user:user},relations:{role:true}})
    }

    public getUserList=async(role:Role)=>{
        return await this.repo.find({relations:{user:true,role:true},where:{role:role}})
    }

    public addUserRole=async(email:string,roleId:number)=>{
    const newUserRoleMapping = this.repo.create()
    const roleToAssign = await this.roleRepository.getRole(roleId)
    const user = await this.userRepository.getUser(email)
    console.log(roleToAssign,user)
    if(roleToAssign && user){
        newUserRoleMapping.role=roleToAssign
        newUserRoleMapping.user=user
        await this.repo.save(newUserRoleMapping)
    }
}
}