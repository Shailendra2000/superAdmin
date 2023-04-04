"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRoute = void 0;
var express_1 = require("express");
var taskController_1 = require("../controllers/taskController");
var validateAdmin_1 = require("../middlewares/validateAdmin");
var TaskRoute = /** @class */ (function () {
    function TaskRoute() {
        this.path = '/tasks';
        this.router = (0, express_1.Router)();
        this.tasksController = new taskController_1.taskController();
        this.validateUserMiddleWare = new validateAdmin_1.validateUserMiddleWare();
        this.initializeRoutes();
    }
    TaskRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), this.validateUserMiddleWare.validateUser, this.tasksController.userTasks);
        this.router.post("".concat(this.path), this.validateUserMiddleWare.validateUser, this.tasksController.createUserTask);
        this.router.delete("".concat(this.path), this.validateUserMiddleWare.validateUser, this.tasksController.deleteUserTask);
        this.router.put("".concat(this.path), this.validateUserMiddleWare.validateUser, this.tasksController.updateUserTask);
        this.router.get("".concat(this.path, "/:id"), this.validateUserMiddleWare.validateUser, this.validateUserMiddleWare.validateAdmin, this.tasksController.userTasks);
    };
    return TaskRoute;
}());
exports.TaskRoute = TaskRoute;
