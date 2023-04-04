import { Router} from "express";
import { userController } from "../controllers/users.controller";
import { IRoute } from "../interfaces/route.interface";
import { AuthMiddleWare } from "../middlewares/auth.middleware";

export class usersRoute implements IRoute {
    public path = '/users';
    public router = Router();
    private usersController;
    private authMiddleware;

    constructor() {
        this.usersController = new userController()
        this.authMiddleware = new AuthMiddleWare()
        this.initializeRoutes();
    }
    private initializeRoutes() {
         this.router.get(`${this.path}`,this.authMiddleware.isUser,this.authMiddleware.isAdmin,this.usersController.get)
    }
}