import { Router} from "express";
import { userController } from "../controllers/userListController";
import { IRoute } from "../interfaces/RouteInterface";
import { validateUserMiddleWare } from "../middlewares/validateAdmin";

export class usersRoute implements IRoute {
    public path = '/users';
    public router = Router();
    private usersController;
    private validateUserMiddleWare;

    constructor() {
        this.usersController = new userController()
        this.validateUserMiddleWare = new validateUserMiddleWare()
        this.initializeRoutes();
    }
    private initializeRoutes() {
         this.router.get(`${this.path}`,this.validateUserMiddleWare.validateUser,this.validateUserMiddleWare.validateAdmin,this.usersController.userList)
    }
}