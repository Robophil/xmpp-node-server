/**
 * Created by Samuel on 08/12/2016.
 */
import {RoasterUtil} from "../util/RoasterUtil";
import {MessageService} from "../application";
import {BaseOnlineHandler} from "../core/BaseOnlineHandler";

export default class OnlineHandler extends BaseOnlineHandler {


    constructor(messageService: MessageService) {
        super(messageService);
    }

    onOnline(): void {
        super.onOnline();
        for (let i = 0; i < this.messageService.connectedUsers.length; i++) {
            let myRoaster = RoasterUtil.generateRoaster(this.client.jid.userJID, this.client.jid.userJID, 'myRandomId', this.messageService.connectedUsers[i]);
            if (this.messageService.clientsHandles[this.messageService.connectedUsers[i]]) {
                this.messageService.clientsHandles[this.messageService.connectedUsers[i]].send(myRoaster);
            }
        }
    }

}
