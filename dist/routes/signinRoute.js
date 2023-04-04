"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRoute = void 0;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var validateAdmin_1 = require("../middlewares/validateAdmin");
var SignInRoute = /** @class */ (function () {
    function SignInRoute() {
        this.signInPath = '/signin';
        this.signUpPath = '/signup';
        this.router = (0, express_1.Router)();
        this.logInController = new auth_controller_1.loginController();
        this.signinMiddleware = new validateAdmin_1.validateUserMiddleWare();
        this.initializeRoutes();
    }
    SignInRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.signInPath), this.signinMiddleware.verifyAccount, this.logInController.loginUser);
        this.router.post("".concat(this.signUpPath), this.logInController.registerUser);
    };
    return SignInRoute;
}());
exports.SignInRoute = SignInRoute;
