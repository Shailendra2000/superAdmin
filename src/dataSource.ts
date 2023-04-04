import "reflect-metadata"
import { DataSource } from "typeorm"
import { Role,Task,User,UserRoleMapping,UserTaskMapping,TaskStatus,TaskStatusHistory } from "./entities"

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