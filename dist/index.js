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
var confirmationCodeGenerator_1 = require("./utils/confirmationCodeGenerator");
dotenv.config();
var server = (0, fastify_1["default"])({
    logger: (0, pino_1["default"])({
        level: 'info'
    })
});
var prisma = new client_1.PrismaClient();
var Port = server.get('/', function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
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
                return [2 /*return*/, (0, responses_1.successResponse)(rep, result, 'Successfully registered user')];
            case 3:
                err_1 = _b.sent();
                req.log.error(err_1);
                return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Activate account
server.put('/user/activate', function (req, rep) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
        }
        catch (err) {
            req.log.error(err);
            return [2 /*return*/, (0, responses_1.errorResponse)(rep)];
        }
        return [2 /*return*/];
    });
}); });
// Reset Password
// const PORT = process.env.APP_PORT;
var start = function (port) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, server.listen(port)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                server.log.error(err_2);
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