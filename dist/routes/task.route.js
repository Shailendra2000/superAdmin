"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoute = void 0;
var express_1 = require("express");
var task_controller_1 = require("../controllers/task.controller");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var TaskRoute = /** @class */ (function () {
    function TaskRoute() {
        this.path = '/tasks';
        this.router = (0, express_1.Router)();
        this.tasksController = new task_controller_1.taskController();
        this.authMiddleware = new auth_middleware_1.AuthMiddleWare();
        this.initializeRoutes();
    }
    TaskRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), this.authMiddleware.isUser, this.tasksController.get);
        this.router.post("".concat(this.path), this.authMiddleware.isUser, this.tasksController.create);
        this.router.delete("".concat(this.path), this.authMiddleware.isUser, this.tasksController.delete);
        this.router.put("".concat(this.path), this.authMiddleware.isUser, this.tasksController.update);
        this.router.get("".concat(this.path, "/:id"), this.authMiddleware.isUser, this.authMiddleware.isAdmin, this.tasksController.get);
    };
    return TaskRoute;
}());
exports.TaskRoute = TaskRoute;
