import { NextFunction, Request,Response} from "express";
import { User } from "../entities/user"
import { userRepo } from "../repositories/userRepo"
import { userRoleRepo } from "../repositories/userRoleMapRepo"
import { jwtServices } from "../services/jwtServices"

export class validateUserMiddleWare{
    private jwtService;
    private superAdminRoleId;
    private userRepository;
    private userRoleRepository;

    constructor(){
        this.jwtService = new jwtServices()
        this.superAdminRoleId = 1
        this.userRepository = new userRepo()
        this.userRoleRepository =  new userRoleRepo()
    }
    public validateAdmin=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const result = req.customParam
            const isAdmin = result.isAdmin
            if(isAdmin){
                next()
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            res.status(400).json({'message':'failed'})
        }
    }
    public validateUser=async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.header('Authorization') as string
        const userDetails=this.jwtService.verifyToken(token) 
        if ( userDetails ){
            const email =userDetails.Email
            const user = await this.userRepository.getUser(email)
            if ( user ){
                userDetails['isAdmin']=await this.checkRights(user,this.superAdminRoleId)
                console.log(userDetails)
                req.customParam=userDetails
                next()
            }
            else{
                res.status(400).json({'message':'invalid user'})  
            }
        }
        else{
            res.status(400).json({'message':'invalid user'})
        }  
    }
    public checkRights=async(user:User,roleId:number)=>{
        const userRoles= await this.userRoleRepository.getUserRoles(user)
        for(let role of userRoles){
            if (role.role.id==roleId){
                return true
            }
        }
        return false
    }
}
