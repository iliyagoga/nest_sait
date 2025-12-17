"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.HttpException {
    constructor(res) {
        super(res, common_1.HttpStatus.BAD_REQUEST);
        this.messages = res;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map