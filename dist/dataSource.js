"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var entities_1 = require("./entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Golu@1234",
    database: "superAdmin",
    synchronize: false,
    logging: false,
    entities: [entities_1.User, entities_1.Task, entities_1.Role, entities_1.UserTaskMapping, entities_1.UserRoleMapping, entities_1.TaskStatus, entities_1.TaskStatusHistory],
    migrations: [],
    subscribers: [],
});
