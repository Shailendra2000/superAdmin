import { Router} from "express";
import { loginController } from "../controllers/controller";
import { IRoute } from "../interfaces/RouteInterface";
import { signInMiddleware } from "../middlewares/signInMiddleware";
import { verifyAccountMiddleware } from "../middlewares/verifyAccount";

export class SignInRoute implements IRoute {
    public path = '/signin';
    public router = Router();
    private logInController;
    private signinMiddleware;
    private verifyAccountMiddleware;
    constructor() {
        this.logInController = new loginController()
        this.signinMiddleware = new signInMiddleware()
        this.verifyAccountMiddleware = new verifyAccountMiddleware()
        this.initializeRoutes();
    }
    private initializeRoutes() {
         this.router.post(`${this.path}`,this.signinMiddleware.checkSignInCreds,this.verifyAccountMiddleware.verifyAccount,this.logInController.loginUser)
    }
}