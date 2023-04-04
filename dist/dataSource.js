"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var role_1 = require("./entities/role");
var task_1 = require("./entities/task");
var taskStatus_1 = require("./entities/taskStatus");
var taskStatusHistory_1 = require("./entities/taskStatusHistory");
var user_1 = require("./entities/user");
var userRoleMapping_1 = require("./entities/userRoleMapping");
var userTaskMapping_1 = require("./entities/userTaskMapping");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Golu@1234",
    database: "superAdmin",
    synchronize: false,
    logging: false,
    entities: [user_1.User, task_1.Task, role_1.Role, userTaskMapping_1.UserTaskMapping, userRoleMapping_1.UserRoleMapping, taskStatus_1.TaskStatus, taskStatusHistory_1.TaskStatusHistory],
    migrations: [],
    subscribers: [],
});
