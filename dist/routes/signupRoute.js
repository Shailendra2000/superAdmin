"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpRoute = void 0;
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var SignUpRoute = /** @class */ (function () {
    function SignUpRoute() {
        this.path = '/signup';
        this.router = (0, express_1.Router)();
        this.logInController = new auth_controller_1.loginController();
        this.initializeRoutes();
    }
    SignUpRoute.prototype.initializeRoutes = function () {
        this.router.post("".concat(this.path), this.logInController.registerUser);
    };
    return SignUpRoute;
}());
exports.SignUpRoute = SignUpRoute;
