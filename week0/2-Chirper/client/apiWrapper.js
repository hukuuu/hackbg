var request = require('request'),
    config = require('./config.json'),
    fs = require('fs');

function commonHandler(cb) {
    return function(err, response, body) {
        if (err)
            return cb(err)

        if (String(response.statusCode).indexOf(2) !== 0)
            return cb({
                statusCode: response.statusCode,
                body: body
            })

        return cb(null, {
            statusCode: response.statusCode,
            body: body
        })
    }
}

function Api(opts) {
    this.opts = opts
}

Api.prototype.register = function(user, cb) {
    var options = {
        url: this.opts.api_url + '/register',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            name: user
        },
        json: true
    }
    request.post(options, function(err, response, body) {
        if (err)
            return cb(err)

        if (String(response.statusCode).indexOf(2) !== 0)
            return cb({
                statusCode: response.statusCode,
                body: body
            })

        config.user = body.user
        config.key = body.key
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4))

        return cb(null, {
            statusCode: response.statusCode,
            body: body
        })
    })
};

Api.prototype.getAllChirps = function(cb) {
    var options = {
        url: this.opts.api_url + '/all_chirps'
    }
    request(options, commonHandler(cb))
};

Api.prototype.getMyChirps = function(cb) {
    var options = {
        url: this.opts.api_url + '/my_chirps',
        qs: {
            user: config.user,
            key: config.key
        }
    }
    request(options, commonHandler(cb))
};

Api.prototype.createChirp = function(text, cb) {
    var options = {
        url: this.opts.api_url + '/chirp',
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            user: this.opts.user,
            key: this.opts.key,
            chirpText: text
        },
        json: true
    }
    request.post(options, commonHandler(cb))
};

Api.prototype.deleteChirp = function(id, cb) {
    var options = {
        url: this.opts.api_url + '/chirp',
        body: {
            key: this.opts.key,
            chirpId: id
        },
        json: true
    }
    request.del(options, commonHandler(cb))
};


module.exports = new Api(config);
