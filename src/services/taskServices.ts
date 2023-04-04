import { TaskStatus } from "../entities/taskStatus";
import { UserTaskMapping } from "../entities/userTaskMapping";
import { IRTask } from "../interfaces/returnedTaskInterface";
import { taskHistoryRepo } from "../repositories/taskHistoryRepo";
import { taskRepo } from "../repositories/taskRepo";
import { userRepo } from "../repositories/userRepo";
import { UserTaskMapRepo } from "../repositories/userTaskMapRepo";

export class taskServices{
    private userRepository;
    private taskRepository;
    private UserTaskMapRepository;
    private taskHistoryRepository;

    constructor(){
        this.userRepository = new userRepo()
        this.taskRepository = new taskRepo()
        this.UserTaskMapRepository = new UserTaskMapRepo()
        this.taskHistoryRepository = new taskHistoryRepo()
    }
    public fetchTasks=async(email:string,reqId:string)=>{
        let user;
        if (reqId){
            user = await this.userRepository.getUserById(Number(reqId))
        }
        else{
            user = await this.userRepository.getUser(email)
        }
        if(user){
            return this.createReturnTaskList(await this.UserTaskMapRepository.getUserTask(user))   
        }
        else{
            throw new Error()
        }    
    }
    public createTask=async(email:string,title:string,desc:string,status:TaskStatus)=>{
        const user = await this.userRepository.getUser(email)
        if(user){
            const newTask= await this.taskRepository.createUserTask(user,title,desc,status) 
            await this.UserTaskMapRepository.userTaskMapping(newTask,user)
            await this.taskHistoryRepository.taskStatusHistory(newTask,status,user,status)
            return newTask
        }
        else{
            throw new Error()
        }     
    }

    public async deleteTask(email:string,taskId:string){
        const user = await this.userRepository.getUser(email)
        if(user){
            await this.taskRepository.deleteTask(Number(taskId))
        }
        else{
            throw new Error()
        }
    }

    public updateTask=async(email:string,title:string,desc:string,status:TaskStatus,taskId:number)=>{
        const taskToUpdate = await this.taskRepository.getUserTask(taskId)
        const user = await this.userRepository.getUser(email)
        if (taskToUpdate && user){
            const oldStatus = taskToUpdate.status
            await this.taskRepository.updateTask(taskId,title,desc,status,user)
            if (taskToUpdate.status!=status){
                await this.taskHistoryRepository.taskStatusHistory(taskToUpdate,status,user,oldStatus)
            }
        }
    }    

    private createReturnTaskList(taskList:UserTaskMapping[]){
        let returnTaskList:IRTask[]=[]
        taskList.forEach(task=>{
            if (task.task.isActive===true){
                let newTask : IRTask = { id:task.task.id, title:task.task.title, desc:task.task.desc, status:task.task.status.status };  
                returnTaskList.push(newTask)
            }
        })
        return returnTaskList
    }
}


