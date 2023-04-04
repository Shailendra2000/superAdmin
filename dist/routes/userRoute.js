"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
var express_1 = require("express");
var userListController_1 = require("../controllers/userListController");
var validateAdmin_1 = require("../middlewares/validateAdmin");
var usersRoute = /** @class */ (function () {
    function usersRoute() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.usersController = new userListController_1.userController();
        this.validateUserMiddleWare = new validateAdmin_1.validateUserMiddleWare();
        this.initializeRoutes();
    }
    usersRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), this.validateUserMiddleWare.validateUser, this.validateUserMiddleWare.validateAdmin, this.usersController.userList);
    };
    return usersRoute;
}());
exports.usersRoute = usersRoute;
