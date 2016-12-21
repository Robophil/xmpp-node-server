"use strict";
const ComponentBase_1 = require("./ComponentBase");
/**
 * Created by Samuel on 21/12/2016.
 */
class BaseOnlineHandler extends ComponentBase_1.ComponentBase {
    onOnline() {
        let userJid = this.client.jid.user + '@' + this.client.jid.domain + '/' + this.client.jid.resource;
        console.log(userJid + 'ONLINE');
        this.client.jid.userJID = userJid;
        this.messageService.clientsHandles.set(userJid, this.client);
        this.messageService.connectedUsers.push(userJid);
    }
}
exports.BaseOnlineHandler = BaseOnlineHandler;
