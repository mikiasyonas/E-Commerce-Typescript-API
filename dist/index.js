"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
        while (_) try {
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
exports.__esModule = true;
var fastify_1 = __importDefault(require("fastify"));
var dotenv = __importStar(require("dotenv"));
var pino_1 = __importDefault(require("pino"));
var client_1 = require("@prisma/client");
var hashGenerator_1 = require("./utils/hashGenerator");
var responses_1 = require("./utils/responses");
var contants_1 = require("./helpers/contants");
var confirmationCodeGenerator_1 = require("./utils/confirmationCodeGenerator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv.config();
var server = (0, fastify_1["default"])({
    logger: (0, pino_1["default"])({
        level: 'info'
    })
});
var prisma = new client_1.PrismaClient();
server.get('/', function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, 'get request'];
    });
}); });
// Regisgter user
server.post('/user', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, dob, hashedPassword, dateOfB, confirmationCode, result, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password, dob = _a.dob;
                return [4 /*yield*/, (0, hashGenerator_1.hashText)(password)];
            case 1:
                hashedPassword = _b.sent();
                dateOfB = new Date(dob);
                confirmationCode = (0, confirmationCodeGenerator_1.generateConfirmationCode)();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            fullName: fullName,
                            email: email,
                            dob: dateOfB,
                            password: hashedPassword,
                            confirmationCode: confirmationCode
                        }
                    })];
            case 2:
                result = _b.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'Successfully registered user', result)];
            case 3:
                err_1 = _b.sent();
                req.log.error(err_1);
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 4: return [2 /*return*/];
        }
    });
}); });
// User login
server.post('/user/login', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, accessToken, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { email: email }
                    })];
            case 1:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.BAD_REQUEST, 'No account found with this email')];
                }
                if (!((0, hashGenerator_1.compareHash)(password, user.password))) {
                    return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.BAD_REQUEST, 'Password Incorrect')];
                }
                return [4 /*yield*/, jsonwebtoken_1["default"].sign({
                        id: user.id
                    }, 'secret')];
            case 2:
                accessToken = _b.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'Successfully logged in', { accessToken: accessToken })];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Activate account
server.put('/user/activate/:id', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var id, confirmationCode, user, updatedUser, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                id = req.params.id;
                confirmationCode = req.body.confirmationCode;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { id: Number(id) }
                    })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                if (user.confirmationCode != confirmationCode) {
                    return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.BAD_REQUEST, 'Incorrect Confirmation Code Entered')];
                }
                return [4 /*yield*/, prisma.user.update({
                        where: { id: Number(id) },
                        data: { activated: true }
                    })];
            case 2:
                updatedUser = _a.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, "User account activated successfully!")];
            case 3: return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 4: return [3 /*break*/, 6];
            case 5:
                err_3 = _a.sent();
                req.log.error(err_3);
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 6: return [2 /*return*/];
        }
    });
}); });
// Request Password Reset
server.put('/user/request-password-reset/:email', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var email, code, updatedUser, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.params.email;
                code = (0, confirmationCodeGenerator_1.generateConfirmationCode)();
                return [4 /*yield*/, prisma.user.update({
                        where: { email: email },
                        data: { passwordResetCode: code }
                    })];
            case 1:
                updatedUser = _a.sent();
                // send the password reset code to email
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'Password reset confirmation sent!')];
            case 2:
                err_4 = _a.sent();
                req.log.error(err_4);
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Reset Password
server.put('/user/reset-password/:email', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var email, code, password, user, hashedPassword, updatedUser, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                email = req.params.email;
                code = req.body.passwordResetCode;
                password = req.body.password;
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { email: email }
                    })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, (0, hashGenerator_1.hashText)(password)];
            case 2:
                hashedPassword = _a.sent();
                if (!user) return [3 /*break*/, 4];
                if (user.passwordResetCode != code) {
                    return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.BAD_REQUEST, 'Incorrect confirmation code entered!')];
                }
                return [4 /*yield*/, prisma.user.update({
                        where: { email: email },
                        data: { password: hashedPassword }
                    })];
            case 3:
                updatedUser = _a.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'Password changed successfully')];
            case 4:
                console.log('err');
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_5 = _a.sent();
                req.log.error(err_5);
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 7: return [2 /*return*/];
        }
    });
}); });
// Add user preference
server.post('/user-preference', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, preferenceId, userPreference, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.body.userId;
                preferenceId = req.body.preferenceId;
                return [4 /*yield*/, prisma.usersPreferences.create({
                        data: {
                            userId: userId,
                            preferenceId: preferenceId
                        }
                    })];
            case 1:
                userPreference = _a.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'Successfully created user preference', userPreference)];
            case 2:
                err_6 = _a.sent();
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Add preference
server.post('/preference', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var name, preference, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                name = req.body.name;
                return [4 /*yield*/, prisma.preference.create({
                        data: {
                            name: name
                        }
                    })];
            case 1:
                preference = _a.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'Successfully created a preference', preference)];
            case 2:
                err_7 = _a.sent();
                return [2 /*return*/, (0, responses_1.errorResponse)(err_7)];
            case 3: return [2 /*return*/];
        }
    });
}); });
// User info
server.get('/user-info/:id', {}, function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    var id, authHeader, bearer, userId, token, user, err_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                authHeader = req.headers['authorization'];
                bearer = authHeader && authHeader.split(' ')[0];
                userId = null;
                if (bearer != 'Bearer') {
                    return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.UNAUTHORIZED, 'Auth token required')];
                }
                token = authHeader && authHeader.split(' ')[1];
                if (token == null) {
                    return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.UNAUTHORIZED, 'Auth token required')];
                }
                jsonwebtoken_1["default"].verify(token, 'secret', function (err, payload) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (err) {
                            return [2 /*return*/, (0, responses_1.errorResponse)(rep, contants_1.STATUS_CODE.FORBIDDEN, 'Unable to verify token')];
                        }
                        if (payload) {
                            userId = payload.id;
                        }
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { id: Number(id) },
                        include: { preferences: true }
                    })];
            case 1:
                user = _a.sent();
                return [2 /*return*/, (0, responses_1.successResponse)(rep, 'User information', user)];
            case 2:
                err_8 = _a.sent();
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 3: return [2 /*return*/];
        }
    });
}); });
var start = function (port) { return __awaiter(void 0, void 0, void 0, function () {
    var err_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, server.listen(port)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_9 = _a.sent();
                server.log.error(err_9);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// server.listen(PORT, (err, address) => {
//   if(err) {
//     console.log(err);
//     process.exit(1);
//   }
//   console.log(`Server started at ${address}`);
// });
start(3000);
//# sourceMappingURL=index.js.map