"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRoute = void 0;
var express_1 = require("express");
var controller_1 = require("../controllers/controller");
var signInMiddleware_1 = require("../middlewares/signInMiddleware");
var verifyAccount_1 = require("../middlewares/verifyAccount");
var SignInRoute = /** @class */ (function () {
    function SignInRoute() {
        this.path = '/signin';
        this.router = (0, express_1.Router)();
        this.logInController = new controller_1.loginController();
        this.signinMiddleware = new signInMiddleware_1.signInMiddleware();
        this.verifyAccountMiddleware = new verifyAccount_1.verifyAccountMiddleware();
        this.initializeRoutes();
    }
    SignInRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.path), this.signinMiddleware.checkSignInCreds, this.verifyAccountMiddleware.verifyAccount, this.logInController.loginUser);
    };
    return SignInRoute;
}());
exports.SignInRoute = SignInRoute;
