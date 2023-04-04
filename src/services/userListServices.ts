import { UserRoleMapping } from "../entities/userRoleMapping"
import { IRUser } from "../interfaces/returnedUserInterface"
import { roleRepo } from "../repositories/roleRepo"
import { userRoleRepo } from "../repositories/userRoleMapRepo"

export class userListServices{
    private defaultUserRoleId;
    private userRoleRepository;
    private roleRepository;

    constructor(){
        this.defaultUserRoleId = 2
        this.userRoleRepository = new userRoleRepo()
        this.roleRepository = new roleRepo()
    }

    public returnUserList=async(roleId:number=this.defaultUserRoleId)=>{
        const role = await this.roleRepository.getRole(roleId)
        if ( role ){
            const userList = await this.userRoleRepository.getUserList(role)
            return this.prepareUserData(userList)
        }
        else{
            return []
        }
    }
    public prepareUserData = (userList:UserRoleMapping[])=>{
        let returnObject:IRUser[]=[];
        userList.forEach(element => {
            let user:IRUser={'id':element.user.id,'email':element.user.email,'name':element.user.name}
            returnObject.push(user)
        });
        return returnObject
    }
}

