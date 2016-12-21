"use strict";
/**
 * Created by Samuel on 08/12/2016.
 */
const RoasterUtil_1 = require("../util/RoasterUtil");
const BaseOnlineHandler_1 = require("../core/BaseOnlineHandler");
class OnlineHandler extends BaseOnlineHandler_1.BaseOnlineHandler {
    constructor(messageService) {
        super(messageService);
    }
    onOnline() {
        super.onOnline();
        for (let i = 0; i < this.messageService.connectedUsers.length; i++) {
            let myRoaster = RoasterUtil_1.RoasterUtil.generateRoaster(this.client.jid.userJID, this.client.jid.userJID, 'myRandomId', this.messageService.connectedUsers[i]);
            if (this.messageService.clientsHandles[this.messageService.connectedUsers[i]]) {
                this.messageService.clientsHandles[this.messageService.connectedUsers[i]].send(myRoaster);
            }
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OnlineHandler;
