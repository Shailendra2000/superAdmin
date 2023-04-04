"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
var express_1 = require("express");
var users_controller_1 = require("../controllers/users.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var usersRoute = /** @class */ (function () {
    function usersRoute() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new users_controller_1.userController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleWare();
        this.initializeRoutes();
    }
    usersRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), this.authMiddleware.isUser, this.authMiddleware.isAdmin, this.usersController.get);
    };
    return usersRoute;
}());
exports.usersRoute = usersRoute;
