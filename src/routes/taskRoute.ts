import { Router,Request,Response} from "express";
import { taskController } from "../controllers/taskController";
import { IRoute } from "../interfaces/RouteInterface";
import { validateUserMiddleWare } from "../middlewares/validateAdmin";

export class TaskRoute implements IRoute {
    public path = '/tasks';
    public router = Router();
    private tasksController;
    private validateUserMiddleWare;
    constructor() {
        this.tasksController = new taskController()
        this.validateUserMiddleWare = new validateUserMiddleWare()
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}`,this.validateUserMiddleWare.validateUser,this.tasksController.userTasks)
        this.router.post(`${this.path}`,this.validateUserMiddleWare.validateUser,this.tasksController.createUserTask)
        this.router.delete(`${this.path}`,this.validateUserMiddleWare.validateUser,this.tasksController.deleteUserTask)
        this.router.put(`${this.path}`,this.validateUserMiddleWare.validateUser,this.tasksController.updateUserTask)
        this.router.get(`${this.path}/:id`,this.validateUserMiddleWare.validateUser,this.validateUserMiddleWare.validateAdmin,this.tasksController.userTasks)
    }
    
}
