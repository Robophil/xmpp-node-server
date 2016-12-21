/**
 * Created by Samuel on 08/12/2016.
 */
"use strict";
const RoasterUtil_1 = require("../util/RoasterUtil");
const BaseStanzaHandler_1 = require("../core/BaseStanzaHandler");
var xmpp = require('node-xmpp-server');
class StanzaHandler extends BaseStanzaHandler_1.BaseStanzaHandler {
    constructor(messageService) {
        super(messageService);
    }
    onStanza(stanza) {
        super.onStanza(stanza);
        if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
            if (this.messageService.connectedUsers.some((val) => {
                return val == stanza.attrs.to;
            })) {
                this.messageService.clientsHandles[stanza.attrs.to].send(stanza);
            }
        }
        else if (stanza.is('presence')) {
            console.log("Presnse", stanza);
            for (let j = 0; j < this.messageService.connectedUsers.length; j++) {
                console.log(stanza.toString());
                stanza.to = this.messageService.connectedUsers[j];
                this.messageService.clientsHandles[stanza.to].send(stanza);
            }
        }
        else if (stanza.is('iq') && stanza.attrs.type == 'get') {
            console.log("IQ", stanza);
            for (let i = 0; i < stanza.children.length; i++) {
                if (stanza.children[i].name == 'query' && stanza.children[i].attrs.xmlns == 'jabber:iq:roster') {
                    for (let j = 0; j < this.messageService.connectedUsers.length; j++) {
                        let roster = RoasterUtil_1.RoasterUtil.generateRoaster(this.messageService.connectedUsers[j], this.messageService.connectedUsers[j], stanza.attrs.id, stanza.attrs.from);
                        this.client.send(roster); // We send it back to the client
                    }
                }
            }
            this.client.send(stanza);
        }
        else {
            this.client.send(stanza);
        }
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StanzaHandler;
