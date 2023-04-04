import bcrypt from 'bcrypt'
import validator from 'validator'
import { userRepo } from '../repositories/userRepo'
import { userRoleRepo } from '../repositories/userRoleMapRepo'
import { jwtServices } from './jwtServices'

export class signUpServices{
    private defaultUserRoleId;
    private jwtService;
    private userRepository;
    private userRoleRepository;

    constructor(){
        this.defaultUserRoleId=2
        this.jwtService = new jwtServices()
        this.userRepository = new userRepo()
        this.userRoleRepository = new userRoleRepo()
    }
    public registerUserToDb=async(username:string,email:string,password:string)=>{
        if (!validator.isEmail(email)){
            return { 'message':'invalid email' }
        }
        const saltRounds: number = 12;
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(password, salt);
        const accessToken = this.jwtService.generateJwtToken(email)
        const response = await this.userRepository.addUser(username,email,hashedPassword,accessToken)
        if (response.message=='sucess'){
            await this.userRoleRepository.addUserRole(email,this.defaultUserRoleId)
        }
        return response
    }
}

