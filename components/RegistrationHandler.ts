/**
 * Created by Samuel on 08/12/2016.
 */
import {MessageService} from "../application";
import {BaseRegistrationHandler} from "../core/BaseRegistrationHandler";

export default class RegistrationHandler extends BaseRegistrationHandler {

    constructor(messageService:MessageService) {
        super(messageService);
    }

    onRegistration(options: any, callback: Function): void {
        console.log('REGISTER');
        console.log(callback);
        callback(false)
    }

}