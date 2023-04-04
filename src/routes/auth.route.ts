import { Router} from "express";
import { loginController } from "../controllers/auth.controller";
import { IRoute } from "../interfaces/route.interface";
import { AuthMiddleWare } from "../middlewares/auth.middleware";

export class AuthRoute implements IRoute {
    public signInPath = '/signin';
    public signUpPath = '/signup';
    public router = Router();
    private logInController;
    private authMiddleware;
    constructor() {
        this.logInController = new loginController()
        this.authMiddleware = new AuthMiddleWare()
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.post(`${this.signInPath}`,this.authMiddleware.validateSignInRequestBody,this.authMiddleware.verifyAccount,this.logInController.loginUser)
        this.router.post(`${this.signUpPath}`,this.authMiddleware.validateSignUpRequestBody,this.logInController.registerUser)

    }
}