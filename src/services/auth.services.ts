import { Role, User } from '../entities'
import { AuthMiddleWare } from '../middlewares';
import { roleRepo, userRepo } from '../repositories'
import { jwtServices } from '.'
import validator from 'validator';
import bcrypt from 'bcrypt'

export class signInServices{
    private adminRoleID;
    private jwtService;
    private userRepository;
    private authMiddleware;
    private defaultUserRoleId;
    private roleRepository;

    constructor(){
        this.defaultUserRoleId=2
        this.adminRoleID = 1
        this.jwtService = new jwtServices()
        this.userRepository= new userRepo()
        this.roleRepository = new roleRepo()
        this.authMiddleware = new AuthMiddleWare()
    }

    public signIn=async(email:string)=>{
        const accessToken=this.jwtService.generateJwtToken(email)
        const user =await this.userRepository.getOneByEmail(email) as User
        const isAdmin =await this.authMiddleware.checkRights( user, this.adminRoleID)
        await this.userRepository.updateToken(user,accessToken)
        return { 'message' : 'Sucess', 'token':`${accessToken}`,'isAdmin':isAdmin}
    }

    public registerUserToDb=async(username:string,email:string,password:string)=>{
        if (!validator.isEmail(email)){
            return { 'message':'invalid email' }
        }
        const saltRounds: number = 12;
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashedPassword: string = await bcrypt.hash(password, salt);
        const accessToken = this.jwtService.generateJwtToken(email)
        const response = await this.userRepository.add(username,email,hashedPassword,accessToken)
        if (response.message=='sucess'){
            const user = await this.userRepository.getOneByEmail(email) as User
            const role = await this.roleRepository.getOneById(this.defaultUserRoleId) as Role
            await this.userRepository.addRole(user,role)
        }
        return response
    }
}

