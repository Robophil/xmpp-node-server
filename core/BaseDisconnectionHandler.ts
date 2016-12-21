/**
 * Created by Samuel on 21/12/2016.
 */
import {ComponentBase} from "./ComponentBase";
export class BaseDisconnectionHandler  extends ComponentBase {
    onDisconnected(): void{
        let userJid = this.client.jid.user + '@' + this.client.jid.domain + '/' + this.client.jid.resource;
        this.messageService.connectedUsers.splice(this.messageService.connectedUsers.indexOf(userJid), 1);
        delete this.messageService.clientsHandles[userJid];
    }
}