/**
 * Created by Samuel on 07/12/2016.
 */
import StanzaHandler from "./components/StanzaHandler";
import {BaseRegistrationHandler} from "./core/BaseRegistrationHandler";
import {BaseOnlineHandler} from "./core/BaseOnlineHandler";
import {BaseAuthenticationHandler} from "./core/BaseAuthenticationHandler";
import {BaseStanzaHandler} from "./core/BaseStanzaHandler";
import {BaseDisconnectionHandler} from "./core/BaseDisconnectionHandler";

var Stanza = require('node-xmpp-core').Stanza;
var IQ = require('node-xmpp-core').IQ;
var xmpp = require('node-xmpp-server');



export class MessageService {

    private server: any;
    public clientsHandles: Map<string, any>;
    public connectedUsers: Array<string>;

    constructor() {
        this.clientsHandles = new Map();
        this.connectedUsers = [];
        this.server = new xmpp.C2S.WebSocketServer({
            port: 5280,
            domain: 'localhost'
        });
        this.server.on("connection", (client) => {
            this.loadHandlers(client);
        });
        this.server.on("listening", () => {
            console.log('listening at 5280');
        });
    }

    private loadHandlers(client: any): void {
        require('require-all')({
            dirname: __dirname + '/components',
            filter: /(.+Handler)\.js$/,
            excludeDirs: /^\.(git|svn)$/,
            recursive: false,
            resolve: (Handler) => {
                let handler = new Handler.default(this);
                this.registerHandler(handler, client);
            }
        });
    }

    private registerHandler(handler: any, client: any) {
        if (handler instanceof BaseStanzaHandler) {
            (<BaseStanzaHandler>handler).setClient(client);
            client.on("stanza", (<BaseStanzaHandler>handler).onStanza.bind(handler));
        }

        if (handler instanceof BaseRegistrationHandler) {
            (<BaseRegistrationHandler>handler).setClient(client);
            client.once("register", (<BaseRegistrationHandler>handler).onRegistration.bind(handler));
        }

        if (handler instanceof BaseOnlineHandler) {
            (<BaseOnlineHandler>handler).setClient(client);
            client.on("online", (<BaseOnlineHandler>handler).onOnline.bind(handler));
        }

        if (handler instanceof BaseAuthenticationHandler) {
            (<BaseAuthenticationHandler>handler).setClient(client);
            client.once("authenticate", (<BaseAuthenticationHandler>handler).onAuthenticate.bind(handler));
        }

        if (handler instanceof BaseDisconnectionHandler) {
            (<BaseDisconnectionHandler>handler).setClient(client);
            client.once("disconnect", (<BaseDisconnectionHandler>handler).onDisconnected.bind(handler));
        }
    }
}

new MessageService();