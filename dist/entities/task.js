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
exports.Task = void 0;
var typeorm_1 = require("typeorm");
var _1 = require("./");
var Task = /** @class */ (function () {
    function Task() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Task.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 100 }),
        __metadata("design:type", String)
    ], Task.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)('varchar', { length: 200 }),
        __metadata("design:type", String)
    ], Task.prototype, "desc", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return _1.TaskStatus; }, function (taskStatus) { return taskStatus.tasks; }, { eager: true }),
        __metadata("design:type", _1.TaskStatus)
    ], Task.prototype, "status", void 0);
    __decorate([
        (0, typeorm_1.Column)('boolean'),
        __metadata("design:type", Boolean)
    ], Task.prototype, "isActive", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return _1.User; }),
        __metadata("design:type", _1.User)
    ], Task.prototype, "createdBy", void 0);
    __decorate([
        (0, typeorm_1.Column)('date'),
        __metadata("design:type", Date)
    ], Task.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return _1.User; }),
        __metadata("design:type", _1.User)
    ], Task.prototype, "updatedBy", void 0);
    __decorate([
        (0, typeorm_1.Column)('date'),
        __metadata("design:type", Date)
    ], Task.prototype, "updatedAt", void 0);
    Task = __decorate([
        (0, typeorm_1.Entity)()
    ], Task);
    return Task;
}());
exports.Task = Task;
