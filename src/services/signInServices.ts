import { User } from '../entities/user'
import { validateUserMiddleWare } from '../middlewares/validateAdmin';
import { userRepo } from '../repositories/userRepo'
import { jwtServices } from './jwtServices'

export class signInServices{
    private adminRoleID;
    private jwtService;
    private userRepository;
    private validateUserMiddleWare;

    constructor(){
        this.adminRoleID = 1
        this.jwtService = new jwtServices()
        this.userRepository= new userRepo()
        this.validateUserMiddleWare = new validateUserMiddleWare()
    }

    public signIn=async(email:string)=>{
        const accessToken=this.jwtService.generateJwtToken(email)
        const user =await this.userRepository.getUser(email) as User
        const isAdmin =await this.validateUserMiddleWare.checkRights( user, this.adminRoleID)
        await this.userRepository.updateToken(email,accessToken)
        return { 'message' : 'Sucess', 'token':`${accessToken}`,'isAdmin':isAdmin}
    }
}

