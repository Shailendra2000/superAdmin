import { AppDataSource } from "../dataSource";
import { User } from "../entities/user";

export class userRepo{
    private repo;
    constructor(){
        this.repo=AppDataSource.getRepository(User)
    }
    public getUser=async(userEmail:string)=>{
        return await this.repo.findOneBy({email:userEmail})
    }
    public getUserById=async(id:number)=>{
        return await this.repo.findOneBy({id:id})
    }
    public addUser=async(username:string,email:string,hashedPassword:string,accessToken:string)=>{
        const newUser=this.repo.create()
        newUser.email=email
        newUser.isActive=true
        newUser.password=hashedPassword
        newUser.name=username
        newUser.accessToken=accessToken
        await this.repo.save(newUser)
        return {'message':'sucess'}
    }
    public updateToken=async(userEmail:string,token:string)=>{
        let user= await this.repo.findOneBy({email:userEmail})
        if ( user ){
            await this.repo.update({email:userEmail},{accessToken:token})
        }
    }
    public getUserPassword=async(email:string)=>{
        const user=await this.repo.findOneBy({email:email})
        if (user){
            return user.password
        }
        else{
            return 'Invalid Email'
        }
    }
      
}
