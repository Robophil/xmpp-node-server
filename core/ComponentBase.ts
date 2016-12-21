/**
 * Created by Samuel on 21/12/2016.
 */

import {MessageService} from "../application";
interface handlerBase {
    setClient(client: any): void
}

export class ComponentBase implements handlerBase{

    protected messageService:MessageService;
    protected client:any;

    constructor(messageService:MessageService){
        this.messageService = messageService;
    }

    setClient(client: any): void {
        this.client = client;
    }
}