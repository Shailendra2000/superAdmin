"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidation = void 0;
var joi_1 = __importDefault(require("joi"));
var JoiValidation = /** @class */ (function () {
    function JoiValidation() {
        this.signInTemplete = joi_1.default.object({
            password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: joi_1.default.string().email({ minDomainSegments: 2 }),
        });
        this.signUpTemplete = joi_1.default.object({
            username: joi_1.default.string().alphanum().min(3).max(30).required(),
            password: joi_1.default.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            email: joi_1.default.string().email({ minDomainSegments: 2 }),
        });
    }
    return JoiValidation;
}());
exports.JoiValidation = JoiValidation;
