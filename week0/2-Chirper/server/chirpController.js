var seq = require('./sequence'),
    url = require('url')

function ChirpController(db) {
    this.db = db
    this.seq = seq;
}

ChirpController.prototype.getAll = function(req, res, cb) {
    cb(null, this.db.chirps)
};

ChirpController.prototype.create = function(req, res, cb) {
    try {
        data = JSON.parse(req.body)
    } catch (e) {
        return cb('cannot parse ' + req.body)
    }

    var user = this.db.users.filter(function(u) {
        return u.user === data.user && u
    })[0]

    if (!user)
        return cb('user not found', data.user)

    if (user.key !== data.key)
        return cb('key doesnt match', data.key)
    else {
        var chirp = {
            userId: user.userId,
            chirpId: this.seq(),
            chirpText: data.chirpText,
            chirpTime: new Date().toLocaleString()
        }
        this.db.chirps.push(chirp)
        user.chirps++
        return cb(null, chirp)
    }

}

ChirpController.prototype.delete = function(req, res, cb) {
    try {
        data = JSON.parse(req.body)
    } catch (e) {
        return cb('cannot parse ' + req.body)
    }

    var chirp = this.db.chirps.filter(function(c) {
        return c.chirpId === data.chirpId && c
    })[0]
    if(!chirp)
        return cb('chirp not found', data.chirpId)

    var user = this.db.users.filter(function(u) {
        return u.userId === chirp.userId && u
    })[0]

    if (user.key !== data.key)
        return cb('key doesnt match', data.key)
    else {
        this.db.chirps.splice(this.db.chirps.indexOf(chirp),1)
        user.chirps--
        return cb(null, 'ok')
    }
};

ChirpController.prototype.allById = function(req, res, cb) {
    var params = url.parse(req.url, true).query,
        user, chirp
    if(params.userId) {
        console.log(params.userId);
        user = this.db.users.filter(function(u) {
            return params.userId == u.userId && u
        })[0]

        if(!user)
            return cb('user not found', params.userId)

        return cb(null, this.db.chirps.filter(function(c) {
            return c.userId === user.userId && c
        }))
    } else {
        return cb(null, this.db.chirps.filter(function(c) {
            return c.chirpId == params.chirpId && c
        }))
    }
};

module.exports = ChirpController;
