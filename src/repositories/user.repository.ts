import { AppDataSource } from "../dataSource";
import { Role,User,UserTaskMapping,UserRoleMapping,Task } from "../entities";
import { roleRepo } from "./";

export class userRepo{
    
    private repo;
    private taskRepo;
    private roleRepository;
    private userRoleMapRepository;
    constructor(){
        this.repo=AppDataSource.getRepository(User)
        this.taskRepo=AppDataSource.getRepository(UserTaskMapping)
        this.userRoleMapRepository = AppDataSource.getRepository(UserRoleMapping)
        this.roleRepository = new roleRepo()
    }
    
    public getOneByEmail=async(userEmail:string)=>{
        return await this.repo.findOneBy({email:userEmail})
    }
    
    public getOneById=async(id:number)=>{
        return await this.repo.findOneBy({id:id})
    }
    
    public add=async(username:string,email:string,hashedPassword:string,accessToken:string)=>{
        const newUser=this.repo.create()
        newUser.email=email
        newUser.isActive=true
        newUser.password=hashedPassword
        newUser.name=username
        newUser.accessToken=accessToken
        await this.repo.save(newUser)
        return {'message':'sucess'}
    }
    
    public updateToken=async(user:User,token:string)=>{
        await this.repo.update({id:user.id},{accessToken:token})
        
    }
    
    public getPassword=async(email:string)=>{
        const user=await this.repo.findOneBy({email:email})  
        if (user){
            return user.password
        }
        else{
            return 'Invalid Email'
        }
    }
         
    public addTask=async(task:Task,user:User)=>{
        const newUserTaskMapping = this.taskRepo.create()
        newUserTaskMapping.task=task
        newUserTaskMapping.user=user
        await this.repo.save(newUserTaskMapping)   
    }

    public getTasks=async(user:User)=>{
        return await this.taskRepo.find({where:{user:user},relations:{task:true}})
    }

    
    public getRole=async(user:User)=>{
        return await this.userRoleMapRepository.find({where:{user:user},relations:{role:true}})
    }

    public getByRole=async(role:Role)=>{
        return await this.userRoleMapRepository.find({relations:{user:true,role:true},where:{role:role}})
    }

    public addRole=async(user:User,role:Role)=>{
        const newUserRoleMapping = this.userRoleMapRepository.create()
        newUserRoleMapping.role=role
        newUserRoleMapping.user=user
        await this.userRoleMapRepository.save(newUserRoleMapping)    
    }
}
