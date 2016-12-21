/**
 * Created by Samuel on 19/10/2016.
 */

var c2s = null;
var debug = console.log//require('debug')('server-and-client')
var Client = require('node-xmpp-client');
var randomWords = require('random-words');

var Stanza = require('node-xmpp-core').Stanza;
var IQ = require('node-xmpp-core').IQ;
var xmpp = require('node-xmpp-server');

startClient = function () {

    var client1 = new Client({
        websocket: {url: 'ws://localhost:5280'},
        jid: 'client1@localhost',
        password: 'secret'
    });

    client1.on('online', function (data) {
        debug(data);
    });

    client1.on('stanza', function (stanza) {
        debug('client1', 'received stanza', stanza.root().toString())
    });

    client1.on('error', function (error) {
        debug('client1', error)
    });
};

startClient();