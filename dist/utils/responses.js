"use strict";
exports.__esModule = true;
exports.errorResponse = exports.successResponse = void 0;
var contants_1 = require("../helpers/contants");
function successResponse(rep, payload, message) {
    var response = {
        success: true,
        message: message,
        data: payload
    };
    rep.code(contants_1.STATUS_CODE.OK).send(response);
}
exports.successResponse = successResponse;
function errorResponse(rep, code, message) {
    if (code === void 0) { code = contants_1.STATUS_CODE.INTERNAL_SERVER; }
    if (message === void 0) { message = "Internal Server Error!"; }
    var response = {
        success: false,
        message: message
    };
    rep.code(code).send(response);
}
exports.errorResponse = errorResponse;
//# sourceMappingURL=responses.js.map