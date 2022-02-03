"use strict";
exports.__esModule = true;
exports.generateConfirmationCode = void 0;
function generateConfirmationCode() {
    return (Math.floor(10000 + Math.random() * 900000)).toString();
}
exports.generateConfirmationCode = generateConfirmationCode;
//# sourceMappingURL=confirmationCodeGenerator.js.map