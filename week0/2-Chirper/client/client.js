var argv = require('minimist')(process.argv.slice(2)),
    api = require('./apiWrapper.js')

handle(argv)

function handle(argv) {
    var handler = chooseHandler(argv)
    if (!handler) {
        console.log('i dont understand this command');
    } else {
        handler(argv, function(error, result) {
            if (error) {
                console.log('ERROR: ', error)
            } else {
                console.log('OK: ', result)
            }
        })
    }

}

function chooseHandler(argv) {
    if (argv.register)
        return registerUser
    if (argv.getall)
        return getAllChirps
    if (argv.getself)
        return getMyChirps
    if (argv.create)
        return createChirp
    if (argv['delete'])
        return deleteChirp

}

function getAllChirps(argv, cb) {
    api.getAllChirps(cb)
}

function getMyChirps(argv, cb) {
    api.getMyChirps(cb)
}

function createChirp(argv, cb) {
    if (!argv.message)
        return cb('no message ( --message=somemessage )')

    api.createChirp(argv.message, cb)
}

function deleteChirp (argv, cb) {
	if(!argv.chirpid)
		return cb('no chirpid ( --chirpid=someid )')

	api.deleteChirp(argv.chirpid, cb)
}

function registerUser(argv, cb) {
    var user = argv.user
    if (!user) {
        return cb('no user ( --user=someuser )')
    } else {
        return api.register(user, cb)
    }

}
