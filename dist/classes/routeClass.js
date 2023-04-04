"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
var express_1 = require("express");
var Route = /** @class */ (function () {
    function Route(params) {
        this.router = (0, express_1.Router)();
        this.path = params.path;
        this.initializeRoute(params.getCallBack, params.postCallBack, params.deleteCallBack, params.putCallBack);
    }
    Route.prototype.initializeRoute = function (getcallback, postcallback, deletecallback, putcallback) {
        this.router.get(this.path, getcallback);
        this.router.post(this.path, postcallback);
        this.router.delete(this.path, deletecallback);
        this.router.put(this.path, putcallback);
    };
    return Route;
}());
exports.Route = Route;
var defaultRoute = function (req, res) {
    res.send('Service not avaliable!');
};
