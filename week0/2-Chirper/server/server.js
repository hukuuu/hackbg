var http = require('http'),
    Router = require('./router.js'),
    ChirpController = require('./ChirpController'),
    UserController = require('./UserController');


var db = {
    users: [{
        "user": "ivan",
        "userId": 999,
        "key": "GEDNFQHUUUSEGARDFVTT",
        "chirps": 1
    }],
    chirps: [{
        "userId": 999,
        "chirpId": 999,
        "chirpText": "lorem...",
        "chirpTime" : new Date().toLocaleString()
    }]
}
var router = new Router(),
    chirpController = new ChirpController(db),
    userController = new UserController(db)



//users
router.get('/all_users', userController.getAll.bind(userController))
router.post('/register', userController.register.bind(userController))
router.get('/my_chirps', userController.getMyChirps.bind(userController))

//chirs
router.get('/all_chirps', chirpController.getAll.bind(chirpController))
router.post('/chirp', chirpController.create.bind(chirpController))
router.delete('/chirp', chirpController.delete.bind(chirpController))
router.get('/chirps', chirpController.allById.bind(chirpController))

http.createServer(function(req, res) {

    var payload = ''

    req.on('data', function(chunk) {
        console.log("Received body data:");
        console.log(chunk.toString());
        payload += chunk.toString();
    });

    req.on('end', function() {
        //handle
        req.body = payload;
        router.handle(req, res, function(err, payload) {
            if (err) {
                if (typeof err === 'string') {
                    res.end(err)
                } else {
                    res.statusCode = err.status
                    res.end(err.text)
                }

            } else {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(payload))
            }
        })
    });

}).listen(8080);
console.log('listening on 8080');
