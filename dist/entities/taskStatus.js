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
exports.TaskStatus = void 0;
var typeorm_1 = require("typeorm");
var _1 = require("./");
var TaskStatus = /** @class */ (function () {
    function TaskStatus() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], TaskStatus.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 100, unique: true }),
        __metadata("design:type", String)
    ], TaskStatus.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)('boolean'),
        __metadata("design:type", Boolean)
    ], TaskStatus.prototype, "isActive", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return _1.User; }),
        __metadata("design:type", _1.User)
    ], TaskStatus.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.Column)('date'),
        __metadata("design:type", Date)
    ], TaskStatus.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return _1.User; }),
        __metadata("design:type", _1.User)
    ], TaskStatus.prototype, "updatedBy", void 0);
    __decorate([
        (0, typeorm_1.Column)('date'),
        __metadata("design:type", Date)
    ], TaskStatus.prototype, "updatedAt", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return _1.Task; }, function (task) { return task.status; }),
        __metadata("design:type", Array)
    ], TaskStatus.prototype, "tasks", void 0);
    TaskStatus = __decorate([
        (0, typeorm_1.Entity)()
    ], TaskStatus);
    return TaskStatus;
}());
exports.TaskStatus = TaskStatus;
