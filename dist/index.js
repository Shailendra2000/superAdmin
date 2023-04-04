"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var routes_1 = require("./routes");
var app = new app_1.default([new routes_1.AuthRoute(), new routes_1.TaskRoute(), new routes_1.usersRoute()]);
app.listen();
