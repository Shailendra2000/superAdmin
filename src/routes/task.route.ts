import { Router,Request,Response} from "express";
import { taskController } from "../controllers/task.controller";
import { IRoute } from "../interfaces/route.interface";
import { AuthMiddleWare } from "../middlewares/auth.middleware";

export class TaskRoute implements IRoute {
    public path = '/tasks';
    public router = Router();
    private tasksController;
    private authMiddleware;
    constructor() {
        this.tasksController = new taskController()
        this.authMiddleware = new AuthMiddleWare()
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get(`${this.path}`,this.authMiddleware.isUser,this.tasksController.get)
        this.router.post(`${this.path}`,this.authMiddleware.isUser,this.tasksController.create)
        this.router.delete(`${this.path}`,this.authMiddleware.isUser,this.tasksController.delete)
        this.router.put(`${this.path}`,this.authMiddleware.isUser,this.tasksController.update)
        this.router.get(`${this.path}/:id`,this.authMiddleware.isUser,this.authMiddleware.isAdmin,this.tasksController.get)
    }
    
}
