/**
 * Created by Samuel on 19/10/2016.
 */
var xmpp = require('./index')
var c2s = null
var debug = console.log//require('debug')('server-and-client')
var Client = require('node-xmpp-client');
var Stanza = require('node-xmpp-core').Stanza;
var IQ = require('node-xmpp-core').IQ;
var randomWords = require('random-words');

startClient = function () {
    var clientName = randomWords(1)[0];
    var client1 = new Client({
        websocket: {url: 'ws://localhost:5280'},
        jid: clientName + '@localhost',
        password: 'secret'
    });

    client1.on('online', function (data) {
        debug(data);
        //client1.send(new IQ({from: data.jid, type: 'get', id: 'rand'}).c('query', {xmlns: 'jabber:iq:roster'}))
        client1.send(new Stanza('message', { to: 'client1@localhost' }).c('body').t('HelloWorld'))
    });

    client1.on('stanza', function (stanza) {
        debug(clientName+' received stanza', stanza.root().toString())
    });

    client1.on('error', function (error) {
        debug(clientName, error)
    })
};

startClient();