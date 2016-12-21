'use strict'

var debug = console.log;
var Stanza = require('node-xmpp-core').Stanza;
var IQ = require('node-xmpp-core').IQ;

var roaster = new Map();


var xmpp = require('node-xmpp-server');

function generateRoster(jid, name, id, to) {
    // This is a roster request, we create the response node
    var roster = new xmpp.Element('iq', {
        id: id,
        to: to,
        type: 'set'
    });

    roster.c('query', {
        xmlns: 'jabber:iq:roster',
        ver: 'ver13'
    })// We add a children tag `query`, with the two attribute xmlns and ver
        .c('item', { // We add a children 'Item'
            jid: jid, // We send the jid and the name
            name: name,
            subscription: 'both'
        }).c('group').t('Connected Clients'); // We add it to the 'Connected Clients' group

    return roster;
}

var startServer = function (done) {
    // Sets up the server.
    let server = new xmpp.C2S.WebSocketServer({
        port: 5280,
        domain: 'localhost'
    });

    var connectedUsers = [];
    var clientsHandles = {};

    // On connection event. When a client connects.
    server.on('connection', function (client) {
        var userJid = null;
        // That's the way you add mods to a given server.

        // Allows the developer to register the jid against anything they want
        client.on('register', function (opts, cb) {
            console.log('REGISTER');
            console.log(cb);
            cb(false);
        });

        // Allows the developer to authenticate users against anything they want.
        client.on('authenticate', function (opts, cb) {
            //console.log('server:', opts.username, opts.password, 'AUTHENTICATING')
            if (opts.password === 'secret') {
                //console.log('server:', opts.username, 'AUTH OK')
                cb(null, opts)
            } else {
                //console.log('server:', opts.username, 'AUTH FAIL')
                cb(false);
            }
        });

        client.on('online', function () {
            console.log(client);
            userJid = client.jid.user + '@' + client.jid.domain + '/' + client.jid.resource;
            console.log(userJid + 'ONLINE');

            for (var i = 0; i < connectedUsers.length; i++) {
                var myRoster = generateRoster(userJid, userJid, 'myRandomId', connectedUsers[i]);

                if (clientsHandles[connectedUsers[i]]) {
                    clientsHandles[connectedUsers[i]].send(myRoster);
                }
            }

            connectedUsers.push(userJid);
            client.jid.userJid = userJid;
            clientsHandles[userJid] = client;
        });

        // Stanza handling
        client.on('stanza', function (stanza) {
            //console.log("Message", stanza);
            if (stanza.is('message') && (stanza.attrs.type !== 'error')) {
                if (clientsHandles[stanza.attrs.to]) {
                    clientsHandles[stanza.attrs.to].send(stanza);
                }
            }
            else if (stanza.is('presence')) {
                // We loop through the user list
                //console.log("Presnse", stanza);
                for (var j = 0; j < connectedUsers.length; j++) {
                    //console.log(stanza.toString());
                    var jid = connectedUsers[j];
                    stanza.to = jid;
                    clientsHandles[jid].send(stanza);
                }
            }
            else if (stanza.is('iq') && stanza.attrs.type == 'get') {
                //console.log("IQ", stanza);
                for (var i = 0; i < stanza.children.length; i++) {
                    if (stanza.children[i].name == 'query' && stanza.children[i].attrs.xmlns == 'jabber:iq:roster') {

                        // We loop through the user list
                        for (var j = 0; j < connectedUsers.length; j++) {

                            var roster = generateRoster(connectedUsers[j], connectedUsers[j], stanza.attrs.id, stanza.attrs.from);
                            client.send(roster); // We send it back to the client
                        }

                    }
                }
                client.send(stanza);
            }
            else {
                client.send(stanza);
            }
        });

        // On Disconnect event. When a client disconnects
        client.on('disconnect', function () {
            if (userJid) {
                console.log(userJid, "DISCONNECTED");
                connectedUsers.splice(connectedUsers.indexOf(userJid), 1);
                delete clientsHandles[userJid];
            }
        });
    });


    server.on('listening', () =>{
        console.log('listening at 5280');
        if (done)done();
    })
};

startServer();
