var generateKey = require('./keyGenerator'),
    url = require('url'),
    seq = require('./sequence');

function UserController(db) {
    this.db = db
    this.seq = seq
}

UserController.prototype.getAll = function(req, res, cb) {
    cb(null, this.db.users)
        // cb(null, 'idvat')
};

UserController.prototype.register = function(req, res, cb) {
    var data,
        user

    try {
        data = JSON.parse(req.body)
    } catch (e) {
        return cb('cannot parse ' + req.body)
    }

    var others = this.db.users.filter(function(u) {
        return u.user === data.name && u
    }).length > 0

    if (others)
        return cb({
            status: 409,
            text: 'user already exists'
        })

    user = {
        user: data.name,
        userId: this.seq(),
        key: generateKey(),
        chirps: 0
    }

    this.db.users.push(user)
    return cb(null, user)
};

UserController.prototype.getMyChirps = function(req, res, cb) {

    var params = url.parse(req.url, true).query;

    console.log('params' , params);

    var user = this.db.users.filter(function(u) {
        return u.user === params.user && u
    })[0]

    if (!user)
        return cb('user not found', params.user)

    if (user.key !== params.key)
        return cb('key doesnt match', params.key)
    else {
        return cb(null, this.db.chirps.filter(function(c) {
            return c.userId === user.userId && c
        }))
    }
};



module.exports = UserController;
