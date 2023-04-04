"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(token) {
    try {
        var secretKey = 'mysecretkey';
        var decodeResult = jsonwebtoken_1.default.verify(token, secretKey);
        return decodeResult;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
exports.verifyToken = verifyToken;
