var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	db = require('../common/subscriberDb');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/subscribe', function(req, res) {
	var response = db.subscribe(req.body)
	res.json(response);
})
app.post('/unsubscribe', function(req, res) {
	db.unsubscribe(req.body)
	res.end('ok')
})
app.get('/listSubscribers', function(req, res) {
	res.json(db.peek())
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Subscriber listening on http://%s:%s', host, port)

})