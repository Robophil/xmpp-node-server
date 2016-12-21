"use strict";
const BaseDisconnectionHandler_1 = require("../core/BaseDisconnectionHandler");
class DisconnectHandler extends BaseDisconnectionHandler_1.BaseDisconnectionHandler {
    constructor(messageService) {
        super(messageService);
    }
    onDisconnected() {
        super.onDisconnected();
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DisconnectHandler;
