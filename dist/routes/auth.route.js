"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var AuthRoute = /** @class */ (function () {
    function AuthRoute() {
        this.signInPath = '/signin';
        this.signUpPath = '/signup';
        this.router = (0, express_1.Router)();
        this.logInController = new auth_controller_1.loginController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleWare();
        this.initializeRoutes();
    }
    AuthRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.signInPath), this.authMiddleware.validateSignInRequestBody, this.authMiddleware.verifyAccount, this.logInController.loginUser);
        this.router.post("".concat(this.signUpPath), this.authMiddleware.validateSignUpRequestBody, this.logInController.registerUser);
    };
    return AuthRoute;
}());
exports.AuthRoute = AuthRoute;
