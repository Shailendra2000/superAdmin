import express from "express";
import {AppDataSource } from './dataSource'
import { DataSource } from "typeorm";
import { IRoute } from "./interfaces/RouteInterface";
import cors from 'cors'
import bodyParser from "body-parser";

class App{
    public app: express.Application
    public port: number
    
    constructor(routes:IRoute[]){
        this.app= express()
        this.port=2000

        this.connectToDatabase()
        this.initializeMiddleWares()
        this.initializeRoutes(routes)
    }
    public listen(){
        this.app.listen(this.port,()=>{
            console.log(`started listening on ${this.port}`)
        });
    }
    private connectToDatabase() {
        this.createConnection(AppDataSource);
    }

    private createConnection(datasource: DataSource) {
        datasource
            .initialize()
            .then(() => {
                console.log('Connected to database!');
            })
            .catch((err: Error) => {
                console.log(
                    'Error in establishing connection with the database..',
                    err
                );
            });
    }

    private initializeMiddleWares(){
        this.app.use(cors());
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    private initializeRoutes(routes:IRoute[]){
        routes.forEach(route => {
            this.app.use('/',route.router)
        });
    }
}

export default App


