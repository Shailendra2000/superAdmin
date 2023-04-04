"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var signinRoute_1 = require("./routes/signinRoute");
var signupRoute_1 = require("./routes/signupRoute");
var taskRoute_1 = require("./routes/taskRoute");
var userRoute_1 = require("./routes/userRoute");
var app = new app_1.default([new signinRoute_1.SignInRoute(), new signupRoute_1.SignUpRoute(), new taskRoute_1.TaskRoute(), new userRoute_1.usersRoute()]);
app.listen();
