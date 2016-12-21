/**
 * Created by Samuel on 08/12/2016.
 */
import {MessageService} from "../application";
import {BaseAuthenticationHandler} from "../core/BaseAuthenticationHandler";

export default class AuthenticationHandler extends BaseAuthenticationHandler {

    constructor(messageService:MessageService) {
        super(messageService);
    }

    onAuthenticate(options: any, callback: Function): void {
        super.onAuthenticate(options, callback);
        if (options.password === 'secret') {
            //console.log(options);
            console.log('server:', options.username, 'AUTH OK');
            callback(null, options)
        }
        else {
            //console.log('server:', opts.username, 'AUTH FAIL')
            callback(false)
        }
    }

}