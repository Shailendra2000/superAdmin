import "reflect-metadata"
import { DataSource } from "typeorm"
import { Role } from "./entities/role"
import { Task } from "./entities/task"
import { TaskStatus } from "./entities/taskStatus"
import { TaskStatusHistory } from "./entities/taskStatusHistory"
import { User } from "./entities/user"
import { UserRoleMapping } from "./entities/userRoleMapping"
import { UserTaskMapping } from "./entities/userTaskMapping"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Golu@1234",
    database: "superAdmin",
    synchronize: false,
    logging: false,
    entities: [User,Task,Role,UserTaskMapping,UserRoleMapping,TaskStatus,TaskStatusHistory],
    migrations: [],
    subscribers: [],
})