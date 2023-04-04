import { Task, TaskStatus,User,UserTaskMapping } from "../entities";
import { ITaskInfo } from "../interfaces";
import { taskRepo,userRepo,taskHistoryRepo, taskStatusRepo } from "../repositories";

export class taskServices{
    private userRepository;
    private taskRepository;
    private taskHistoryRepository;
    private taskStatusRepository;

    constructor(){
        this.userRepository = new userRepo()
        this.taskRepository = new taskRepo()
        this.taskHistoryRepository = new taskHistoryRepo()
        this.taskStatusRepository =new taskStatusRepo()
    }
    public fetchTasks=async(email:string,reqId:string)=>{
        let user;
        if (reqId){
            user = await this.userRepository.getOneById(Number(reqId))
        }
        else{
            user = await this.userRepository.getOneByEmail(email)
        }
        if(user){
            return this.createReturnTaskList(await this.userRepository.getTasks(user))   
        }
        else{
            throw new Error()
        }    
    }
    public createTask=async(email:string,title:string,desc:string,statusname:string)=>{
        const user = await this.userRepository.getOneByEmail(email)
        const status=await this.taskStatusRepository.getOneByName(statusname)

        if(user && status){
            const newTask= await this.taskRepository.add(user,title,desc,status) 
            await this.userRepository.addTask(newTask,user)
            await this.taskHistoryRepository.add(newTask,status,user,status)
            return newTask
        }
        else{
            throw new Error()
        }     
    }

    public async deleteTask(email:string,taskId:string){
        const user = await this.userRepository.getOneByEmail(email)
        const task = await this.taskRepository.getOneById(Number(taskId))
        if(user && task && await this.taskBelongsTo(user,task)){
            await this.taskRepository.delete(Number(taskId))
        }
        else{
            throw new Error()
        }
    }

    public updateTask=async(email:string,title:string,desc:string,statusname:string,taskId:number)=>{
        const taskToUpdate = await this.taskRepository.getOneById(taskId)
        const status=await this.taskStatusRepository.getOneByName(statusname)
        const user = await this.userRepository.getOneByEmail(email)
        if (taskToUpdate && user && status && await this.taskBelongsTo(user,taskToUpdate)){
            const oldStatus = taskToUpdate.status
            await this.taskRepository.update(taskId,title,desc,status,user)
            if (taskToUpdate.status!=status){
                await this.taskHistoryRepository.add(taskToUpdate,status,user,oldStatus)
            }
        }
    }    

    private createReturnTaskList(taskList:UserTaskMapping[]){
        let returnTaskList:ITaskInfo[]=[]
        taskList.forEach(task=>{
            if (task.task.isActive===true){
                let newTask : ITaskInfo = { id:task.task.id, title:task.task.title, desc:task.task.desc, status:task.task.status.status };  
                returnTaskList.push(newTask)
            }
        })
        return returnTaskList
    }

    private async taskBelongsTo(user:User,task:Task){
        const userTasks =await  this.userRepository.getTasks(user)
        for (let element of userTasks ){
            if (element.user == user){
                return true
            }
        } 
        return false
    }
}


