import { NextFunction, Request,Response} from "express";
import { User } from "../entities"
import { userRepo } from "../repositories"
import { jwtServices } from "../services"
import bcrypt from 'bcrypt'
import { signInSchema,signUpSchema } from "../schemas/auth.schema"

export class AuthMiddleWare{
    private jwtService;
    private superAdminRoleId;
    private userRepository;

    constructor(){
        this.jwtService = new jwtServices()
        this.superAdminRoleId = 1
        this.userRepository = new userRepo()
    }
    
    public validateSignInRequestBody=async(req:Request,res:Response,next:NextFunction)=>{
        const { error, value } = signInSchema.validate(req.body);
        if (error){
            res.status(400).json({status: 'error',message: error.details[0].message})
        }
        else{
            next()
        }
    }

    public validateSignUpRequestBody=async(req:Request,res:Response,next:NextFunction)=>{
        const { error, value } = signUpSchema.validate(req.body);
        if (error){
            res.status(400).json({status: 'error',message: error.details[0].message})
        }
        else{
            next()
        }
    }
    public isAdmin=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            if(req.customParam.isAdmin){
                next()
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            res.status(400).json({'message':'unauthorized'})
        }
    }
    public isUser=async(req:Request,res:Response,next:NextFunction)=>{
        const token = req.header('Authorization') as string
        const userDetails=this.jwtService.verifyToken(token) 
        
        if ( userDetails ){
            const email =userDetails.Email
            const user = await this.userRepository.getOneByEmail(email)
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

    
    public verifyAccount=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const { email , password } = req.body
            const userPassword=await this.userRepository.getPassword( email ) as string
            if( await bcrypt.compare(password,userPassword) ){
                next()
            }
            else{
                throw new Error()
            }
        }
        catch(e){
            res.status(400).json({'message':'invalid'})
        }
    }

    public checkRights=async(user:User,roleId:number)=>{
        const userRoles= await this.userRepository.getRole(user)
        for(let role of userRoles){
            if (role.role.id==roleId){
                return true
            }
        }
        return false
    }
}
