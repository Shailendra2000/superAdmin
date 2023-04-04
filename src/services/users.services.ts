import { UserRoleMapping } from "../entities"
import { IUserIdentity } from "../interfaces"
import { roleRepo,userRepo } from "../repositories"

export class userListServices{
    private defaultUserRoleId;
    private userRepository;
    private roleRepository;

    constructor(){
        this.defaultUserRoleId = 2
        this.userRepository = new userRepo()
        this.roleRepository = new roleRepo()
    }

    public returnUserList=async(roleId:number=this.defaultUserRoleId)=>{
        const role = await this.roleRepository.getOneById(roleId)
        if ( role ){
            const userList = await this.userRepository.getByRole(role)
            return this.prepareUserData(userList)
        }
        else{
            return []
        }
    }
    public prepareUserData = (userList:UserRoleMapping[])=>{
        let returnObject:IUserIdentity[]=[];
        userList.forEach(element => {
            let user:IUserIdentity={'id':element.user.id,'email':element.user.email,'name':element.user.name}
            returnObject.push(user)
        });
        return returnObject
    }
}

