"use strict";
/**
 * Created by Samuel on 21/12/2016.
 */
const ComponentBase_1 = require("./ComponentBase");
class BaseDisconnectionHandler extends ComponentBase_1.ComponentBase {
    onDisconnected() {
        let userJid = this.client.jid.user + '@' + this.client.jid.domain + '/' + this.client.jid.resource;
        this.messageService.connectedUsers.splice(this.messageService.connectedUsers.indexOf(userJid), 1);
        delete this.messageService.clientsHandles[userJid];
    }
}
exports.BaseDisconnectionHandler = BaseDisconnectionHandler;
