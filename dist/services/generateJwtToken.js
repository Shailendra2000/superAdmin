"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtServices = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtServices = /** @class */ (function () {
    function jwtServices() {
        this.generateJwtToken = function (email) {
            var payload = { Email: email };
            var secretKey = 'mysecretkey';
            var options = { expiresIn: '24h' };
            var token = jsonwebtoken_1.default.sign(payload, secretKey, options);
            return token;
        };
    }
    jwtServices.prototype.verifyToken = function (token) {
        try {
            var secretKey = 'mysecretkey';
            var decodeResult = jsonwebtoken_1.default.verify(token, secretKey);
            return decodeResult;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    };
    return jwtServices;
}());
exports.jwtServices = jwtServices;
