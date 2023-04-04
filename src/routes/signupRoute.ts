import { Router,Request,Response} from "express";
import { loginController } from "../controllers/controller";
import { IRoute } from "../interfaces/RouteInterface";


export class SignUpRoute implements IRoute {
    public path = '/signup';
    public router = Router();
    private logInController;
    constructor() {
        this.logInController = new loginController()
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.path}`,this.logInController.registerUser)
    }
}
