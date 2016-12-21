"use strict";
const BaseAuthenticationHandler_1 = require("../core/BaseAuthenticationHandler");
class AuthenticationHandler extends BaseAuthenticationHandler_1.BaseAuthenticationHandler {
    constructor(messageService) {
        super(messageService);
    }
    onAuthenticate(options, callback) {
        super.onAuthenticate(options, callback);
        if (options.password === 'secret') {
            //console.log(options);
            console.log('server:', options.username, 'AUTH OK');
            callback(null, options);
        }
        else {
            //console.log('server:', opts.username, 'AUTH FAIL')
            callback(false);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthenticationHandler;
