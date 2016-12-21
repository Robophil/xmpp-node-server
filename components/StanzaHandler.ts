/**
 * Created by Samuel on 08/12/2016.
 */

import {RoasterUtil} from "../util/RoasterUtil";
import {MessageService} from "../application";
import {BaseStanzaHandler} from "../core/BaseStanzaHandler";
var xmpp = require('node-xmpp-server');

export default class StanzaHandler extends BaseStanzaHandler {

    constructor(messageService: MessageService) {
        super(messageService);
    }

    onStanza(stanza): void {
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
                        let roster = RoasterUtil.generateRoaster(this.messageService.connectedUsers[j], this.messageService.connectedUsers[j], stanza.attrs.id, stanza.attrs.from);
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