var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    db = require('../common/subscriberDb'),
    mailSender = require('../common/mailSender'),
    server

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/subscribe', function(req, res) {
    var subscriber = db.subscribe(req.body)
    var response = strip(subscriber)
    mailSender.sendMail({
        to: subscriber.email,
        subject: 'verify subscription',
        html: '<h1>Please <a href="' + getServerUrl(req) + '/verify?key=' + subscriber.key + '">click here</a> to subscribe</h1>'
    })
    res.json(response);
})

function strip(subscriber) {
    return {
        email: subscriber.email,
        subscriberId: subscriber.subscriberId
    }
}

app.post('/unsubscribe', function(req, res) {
    db.unsubscribe(req.body)
    res.end('ok')
})
app.get('/listSubscribers', function(req, res) {
    res.json(db.peek())
})
app.get('/verify', function(req, res) {
    var key = req.query.key
    var verified = db.verify(key)
    if (verified)
        res.send('<h1>you subscribed successfuly</h1>')
    else
        res.send('<h1>wrong key :(</h1>')
})

server = app.listen(3000, function() {
    console.log('Subscriber listening on http://' + server.address().address + ':' + server.address().port)
})

function getServerUrl(req) {
	var url = req.protocol + '://' + req.get('host');
    return url
}
