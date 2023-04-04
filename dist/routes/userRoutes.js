"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
var express_1 = require("express");
var validateToken_1 = require("../middlewares/validateToken");
var usersRoute = /** @class */ (function () {
    function usersRoute() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    usersRoute.prototype.initializeRoutes = function () {
        this.router.get("".concat(this.path), validateToken_1.validateToken, userList);
    };
    return usersRoute;
}());
exports.usersRoute = usersRoute;
