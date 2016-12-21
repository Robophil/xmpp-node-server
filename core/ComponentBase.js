/**
 * Created by Samuel on 21/12/2016.
 */
"use strict";
class ComponentBase {
    constructor(messageService) {
        this.messageService = messageService;
    }
    setClient(client) {
        this.client = client;
    }
}
exports.ComponentBase = ComponentBase;
