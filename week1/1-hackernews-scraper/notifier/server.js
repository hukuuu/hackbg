var express = require('express'),
	bodyParser = require('body-parser'),
	app = express(),
	subscriberDb = require('../common/subscriberDb'),
	articleDb = require('../common/articleDb'),
	nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	}
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/newArticles', function(req, res) {
	console.log('I SHOULD UPDATE');
	res.end('ok')
	notify(subscriberDb.peek(), articleDb.getAllArticles())
})

var server = app.listen(3001, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Notifier listening on http://%s:%s', host, port)

})

function notify (subscribers, articles) {
	var newOnes = articles.filter(function(article) {
		if(article.new) return article
	})
	var send = {}

	newOnes.forEach(function(article) {
		subscribers.forEach(function (subscriber) {
			subscriber.keywords.forEach(function(keyword) {
				if(article.title.indexOf(keyword) > -1) {
					send[subscriber.email] = send[subscriber.email] || []
					send[subscriber.email].push(toHtml(article))
					console.log('push');
				}
			})
		})
	})
	Object.keys(send).forEach(function(email) {
		transporter.sendMail({
			from: 'hukuuu@gmail.com',
			to: email,
			subject:'new articles',
			html: send[email].join('<br/>')
		}, function(err, info) {
			if(err) {
				console.log('error sending mail to ', email);
				console.log(err);
			} else {
				console.log(info);
			}
		})
	})
	console.log('i should send to ', Object.keys(send));
}

function toHtml (article) {
	return '<h1>' + article.title + '</h1><p><b>text:</b>' + article.text + '</p>'
}