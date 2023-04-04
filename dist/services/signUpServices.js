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
exports.signUpServices = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var validator_1 = __importDefault(require("validator"));
var userRepo_1 = require("../repositories/userRepo");
var userRoleMapRepo_1 = require("../repositories/userRoleMapRepo");
var jwtServices_1 = require("./jwtServices");
var signUpServices = /** @class */ (function () {
    function signUpServices() {
        var _this = this;
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
                        return [4 /*yield*/, this.userRepository.addUser(username, email, hashedPassword, accessToken)];
                    case 3:
                        response = _a.sent();
                        if (!(response.message == 'sucess')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userRoleRepository.addUserRole(email, this.defaultUserRoleId)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, response];
                }
            });
        }); };
        this.defaultUserRoleId = 2;
        this.jwtService = new jwtServices_1.jwtServices();
        this.userRepository = new userRepo_1.userRepo();
        this.userRoleRepository = new userRoleMapRepo_1.userRoleRepo();
    }
    return signUpServices;
}());
exports.signUpServices = signUpServices;
