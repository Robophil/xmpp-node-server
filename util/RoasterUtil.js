"use strict";
/**
 * Created by Samuel on 20/12/2016.
 */
var xmpp = require('node-xmpp-server');
class RoasterUtil {
    static generateRoaster(jid, name, id, to) {
        var roster = new xmpp.Element('iq', {
            id: id,
            to: to,
            type: 'set'
        });
        roster.c('query', {
            xmlns: 'jabber:iq:roster',
            ver: 'ver13'
        }) // We add a children tag `query`, with the two attribute xmlns and ver
            .c('item', {
            jid: jid,
            name: name,
            subscription: 'both'
        }).c('group').t('Connected Clients'); // We add it to the 'Connected Clients' group
        return roster;
    }
}
exports.RoasterUtil = RoasterUtil;
