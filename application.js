"use strict";
const BaseRegistrationHandler_1 = require("./core/BaseRegistrationHandler");
const BaseOnlineHandler_1 = require("./core/BaseOnlineHandler");
const BaseAuthenticationHandler_1 = require("./core/BaseAuthenticationHandler");
const BaseStanzaHandler_1 = require("./core/BaseStanzaHandler");
const BaseDisconnectionHandler_1 = require("./core/BaseDisconnectionHandler");
var Stanza = require('node-xmpp-core').Stanza;
var IQ = require('node-xmpp-core').IQ;
var xmpp = require('node-xmpp-server');
class MessageService {
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
    loadHandlers(client) {
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
    registerHandler(handler, client) {
        if (handler instanceof BaseStanzaHandler_1.BaseStanzaHandler) {
            handler.setClient(client);
            client.on("stanza", handler.onStanza.bind(handler));
        }
        if (handler instanceof BaseRegistrationHandler_1.BaseRegistrationHandler) {
            handler.setClient(client);
            client.once("register", handler.onRegistration.bind(handler));
        }
        if (handler instanceof BaseOnlineHandler_1.BaseOnlineHandler) {
            handler.setClient(client);
            client.on("online", handler.onOnline.bind(handler));
        }
        if (handler instanceof BaseAuthenticationHandler_1.BaseAuthenticationHandler) {
            handler.setClient(client);
            client.once("authenticate", handler.onAuthenticate.bind(handler));
        }
        if (handler instanceof BaseDisconnectionHandler_1.BaseDisconnectionHandler) {
            handler.setClient(client);
            client.once("disconnect", handler.onDisconnected.bind(handler));
        }
    }
}
exports.MessageService = MessageService;
new MessageService();
