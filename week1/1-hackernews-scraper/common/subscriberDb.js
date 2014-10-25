var storage = require('node-persist'),
    SUBSCRIBERS = 'subscribers',
    rand = require('generate-key');

storage.initSync() //({dir: './subscribers'})

if (!getAll())
    setAll([])

function getAll() {
    var all = storage.getItem(SUBSCRIBERS)
    return all;
}

function setAll(sbs) {
    storage.setItem(SUBSCRIBERS, sbs)
}

function subscribe(obj) {
    var all = getAll()
    obj.subscriberId = rand.generateKey()
    obj.key = rand.generateKey()
    obj.verified = false
    all.push(obj)
    setAll(all)
    return obj
}

function unsubscribe(obj) {
    var all = getAll()
    var subscriber = all.filter(function(s) {
        if (s.subscriberId === obj.subscriberId)
            return s;
    })[0]
    if (subscriber) {
        all.splice(all.indexOf(subscriber), 1)
        setAll(all)
    }

}

function verify(key) {
    var all = getAll()
    var subscriber = all.filter(function(s) {
        return s.key === key && s
    })[0]
    if (subscriber) {
        subscriber.verified = true
        setAll(all)
        return true
    }
    return false
}

function getAllNoKeys() {
    return getAll().map(function(s) {
        return {
            email: s.email,
            keywords: s.keywords,
            type: s.type,
            subscriberId: s.subscriberId,
            verified: s.verified
        }
    })
}
function getAllVerified () {
    return getAll().filter(function(s) {
        return s.verified && s
    })
}

module.exports = {
    unsubscribe: unsubscribe,
    subscribe: subscribe,
    peek: getAllNoKeys,
    verify: verify,
    getAllVerified: getAllVerified
}
