/**
 * Created by Samuel on 08/12/2016.
 */
import {MessageService} from "../application";
import {BaseDisconnectionHandler} from "../core/BaseDisconnectionHandler";
export default class DisconnectHandler extends BaseDisconnectionHandler {

    constructor(messageService:MessageService) {
        super(messageService);
    }

    onDisconnected(): void {
        super.onDisconnected();
    }

}