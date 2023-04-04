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
exports.signInServices = void 0;
var middlewares_1 = require("../middlewares");
var repositories_1 = require("../repositories");
var _1 = require("./");
var validator_1 = __importDefault(require("validator"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var signInServices = /** @class */ (function () {
    function signInServices() {
        var _this = this;
        this.signIn = function (email) { return __awaiter(_this, void 0, void 0, function () {
            var accessToken, user, isAdmin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accessToken = this.jwtService.generateJwtToken(email);
                        return [4 /*yield*/, this.userRepository.getOneByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.validateUserMiddleWare.checkRights(user, this.adminRoleID)];
                    case 2:
                        isAdmin = _a.sent();
                        return [4 /*yield*/, this.userRepository.updateToken(email, accessToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { 'message': 'Sucess', 'token': "".concat(accessToken), 'isAdmin': isAdmin }];
                }
            });
        }); };
        this.registerUserToDb = function (username, email, password) { return __awaiter(_this, void 0, void 0, function () {
            var saltRounds, salt, hashedPassword, accessToken, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!validator_1.default.isEmail(email)) {
                            return [2 /*return*/, { 'message': 'invalid email' }];
                        }
                        saltRounds = 12;
                        return [4 /*yield*/, bcrypt_1.default.genSalt(saltRounds)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        accessToken = this.jwtService.generateJwtToken(email);
                        return [4 /*yield*/, this.userRepository.add(username, email, hashedPassword, accessToken)];
                    case 3:
                        response = _a.sent();
                        if (!(response.message == 'sucess')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userRepository.addRole(email, this.defaultUserRoleId)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, response];
                }
            });
        }); };
        this.defaultUserRoleId = 2;
        this.adminRoleID = 1;
        this.jwtService = new _1.jwtServices();
        this.userRepository = new repositories_1.userRepo();
        this.validateUserMiddleWare = new middlewares_1.validateUserMiddleWare();
    }
    return signInServices;
}());
exports.signInServices = signInServices;
