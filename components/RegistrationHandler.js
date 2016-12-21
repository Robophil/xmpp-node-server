"use strict";
const BaseRegistrationHandler_1 = require("../core/BaseRegistrationHandler");
class RegistrationHandler extends BaseRegistrationHandler_1.BaseRegistrationHandler {
    constructor(messageService) {
        super(messageService);
    }
    onRegistration(options, callback) {
        super.onRegistration(options, callback);
        console.log('REGISTER');
        console.log(callback);
        callback(false);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RegistrationHandler;
