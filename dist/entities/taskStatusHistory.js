"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatusHistory = void 0;
var typeorm_1 = require("typeorm");
var _1 = require("./");
var TaskStatusHistory = /** @class */ (function () {
    function TaskStatusHistory() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TaskStatusHistory.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return _1.Task; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.Task)
    ], TaskStatusHistory.prototype, "task", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return _1.TaskStatus; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.TaskStatus)
    ], TaskStatusHistory.prototype, "fromStatus", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return _1.TaskStatus; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.TaskStatus)
    ], TaskStatusHistory.prototype, "toStatus", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return _1.User; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.User)
    ], TaskStatusHistory.prototype, "user", void 0);
    TaskStatusHistory = __decorate([
        (0, typeorm_1.Entity)()
    ], TaskStatusHistory);
    return TaskStatusHistory;
}());
exports.TaskStatusHistory = TaskStatusHistory;
