"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskServices = void 0;
var task_history_repository_1 = require("../repositories/task-history.repository");
var task_repository_1 = require("../repositories/task.repository");
var user_repository_1 = require("../repositories/user.repository");
var taskServices = /** @class */ (function () {
    function taskServices() {
        var _this = this;
        this.fetchTasks = function (email, reqId) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!reqId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userRepository.getOneById(Number(reqId))];
                    case 1:
                        user = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.userRepository.getOneByEmail(email)];
                    case 3:
                        user = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!user) return [3 /*break*/, 6];
                        _a = this.createReturnTaskList;
                        return [4 /*yield*/, this.userRepository.getTasks(user)];
                    case 5: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                    case 6: throw new Error();
                }
            });
        }); };
        this.createTask = function (email, title, desc, status) { return __awaiter(_this, void 0, void 0, function () {
            var user, newTask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.getOneByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.taskRepository.add(user, title, desc, status)];
                    case 2:
                        newTask = _a.sent();
                        return [4 /*yield*/, this.userRepository.addTask(newTask, user)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.taskHistoryRepository.add(newTask, status, user, status)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, newTask];
                    case 5: throw new Error();
                }
            });
        }); };
        this.updateTask = function (email, title, desc, status, taskId) { return __awaiter(_this, void 0, void 0, function () {
            var taskToUpdate, user, oldStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.taskRepository.getOneById(taskId)];
                    case 1:
                        taskToUpdate = _a.sent();
                        return [4 /*yield*/, this.userRepository.getOneByEmail(email)];
                    case 2:
                        user = _a.sent();
                        if (!(taskToUpdate && user)) return [3 /*break*/, 5];
                        oldStatus = taskToUpdate.status;
                        return [4 /*yield*/, this.taskRepository.update(taskId, title, desc, status, user)];
                    case 3:
                        _a.sent();
                        if (!(taskToUpdate.status != status)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.taskHistoryRepository.add(taskToUpdate, status, user, oldStatus)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.userRepository = new user_repository_1.userRepo();
        this.taskRepository = new task_repository_1.taskRepo();
        this.taskHistoryRepository = new task_history_repository_1.taskHistoryRepo();
    }
    taskServices.prototype.deleteTask = function (email, taskId) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.getOneByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.taskRepository.delete(Number(taskId))];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error();
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    taskServices.prototype.createReturnTaskList = function (taskList) {
        var returnTaskList = [];
        taskList.forEach(function (task) {
            if (task.task.isActive === true) {
                var newTask = { id: task.task.id, title: task.task.title, desc: task.task.desc, status: task.task.status.status };
                returnTaskList.push(newTask);
            }
        });
        return returnTaskList;
    };
    return taskServices;
}());
exports.taskServices = taskServices;
