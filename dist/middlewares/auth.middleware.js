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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleWare = void 0;
var repositories_1 = require("../repositories");
var services_1 = require("../services");
var bcrypt_1 = __importDefault(require("bcrypt"));
var auth_schema_1 = require("../schemas/auth.schema");
var AuthMiddleWare = /** @class */ (function () {
    function AuthMiddleWare() {
        var _this = this;
        this.validateSignInRequestBody = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error, value;
            return __generator(this, function (_b) {
                _a = auth_schema_1.signInSchema.validate(req.body), error = _a.error, value = _a.value;
                if (error) {
                    res.status(400).json({ status: 'error', message: error.details[0].message });
                }
                else {
                    next();
                }
                return [2 /*return*/];
            });
        }); };
        this.validateSignUpRequestBody = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, error, value;
            return __generator(this, function (_b) {
                _a = auth_schema_1.signUpSchema.validate(req.body), error = _a.error, value = _a.value;
                if (error) {
                    res.status(400).json({ status: 'error', message: error.details[0].message });
                }
                else {
                    next();
                }
                return [2 /*return*/];
            });
        }); };
        this.isAdmin = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (req.customParam.isAdmin) {
                        next();
                    }
                    else {
                        throw new Error();
                    }
                }
                catch (e) {
                    res.status(400).json({ 'message': 'unauthorized' });
                }
                return [2 /*return*/];
            });
        }); };
        this.isUser = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token, userDetails, email, user, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        token = req.header('Authorization');
                        userDetails = this.jwtService.verifyToken(token);
                        if (!userDetails) return [3 /*break*/, 5];
                        email = userDetails.Email;
                        return [4 /*yield*/, this.userRepository.getOneByEmail(email)];
                    case 1:
                        user = _c.sent();
                        if (!user) return [3 /*break*/, 3];
                        _a = userDetails;
                        _b = 'isAdmin';
                        return [4 /*yield*/, this.checkRights(user, this.superAdminRoleId)];
                    case 2:
                        _a[_b] = _c.sent();
                        console.log(userDetails);
                        req.customParam = userDetails;
                        next();
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400).json({ 'message': 'invalid user' });
                        _c.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(400).json({ 'message': 'invalid user' });
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.verifyAccount = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, email, password, userPassword, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, this.userRepository.getPassword(email)];
                    case 1:
                        userPassword = _b.sent();
                        return [4 /*yield*/, bcrypt_1.default.compare(password, userPassword)];
                    case 2:
                        if (_b.sent()) {
                            next();
                        }
                        else {
                            throw new Error();
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        res.status(400).json({ 'message': 'invalid' });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.checkRights = function (user, roleId) { return __awaiter(_this, void 0, void 0, function () {
            var userRoles, _i, userRoles_1, role;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.getRole(user)];
                    case 1:
                        userRoles = _a.sent();
                        for (_i = 0, userRoles_1 = userRoles; _i < userRoles_1.length; _i++) {
                            role = userRoles_1[_i];
                            if (role.role.id == roleId) {
                                return [2 /*return*/, true];
                            }
                        }
                        return [2 /*return*/, false];
                }
            });
        }); };
        this.jwtService = new services_1.jwtServices();
        this.superAdminRoleId = 1;
        this.userRepository = new repositories_1.userRepo();
    }
    return AuthMiddleWare;
}());
exports.AuthMiddleWare = AuthMiddleWare;
