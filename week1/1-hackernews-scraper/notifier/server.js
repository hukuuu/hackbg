var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    subscriberDb = require('../common/subscriberDb'),
    itemDb = require('../common/itemDb'),
    mailSender = require('../common/mailSender'),
    config = require('../config.json'),
    hnApi = require('../common/hnApi'),
    async = require('async')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post(config.notifier.path, function(req, res) {
    var items = itemDb.getAllNewItems(),
        subscribers = subscriberDb.getAllVerified()
    console.log('I SHOULD UPDATE');
    res.end('ok')
    console.log(subscribers.length, items.length);
    notify(subscribers, items)
})

var server = app.listen(config.notifier.port, function() {
    console.log('Notifier listening on http://localhost:' + config.notifier.port)
})

function notify(subscribers, items) {
    var send = {}

    items.forEach(function(item) {
        subscribers.forEach(function(subscriber) {
            if (match(item, subscriber)) {
                send[subscriber.email] = send[subscriber.email] || []
                send[subscriber.email].push(item)
            }
        })
    })

    sendEmails(send)
}

function match(item, subscriber) {
    var text = item.comment ? item.comment.text : item.story.title,
        keywords = subscriber.keywords

    if (item.comment && subscriber.type.indexOf('comment') === -1)
        return false
    if (!item.comment && subscriber.type.indexOf('story' === -1))
        return false

    return matchText(text, keywords)
}

function matchText(text, keywords) {
    var upper = text.toUpperCase()
    var result = false
    console.log('-----------------');
    console.log(upper);

    keywords.forEach(function(keyword) {
        console.log(keyword.toUpperCase());
        if (upper.indexOf(keyword.toUpperCase()) > -1)
            result = true
    })
    return result
}

function sendEmails(send) {
    Object.keys(send).forEach(function(email) {
        mailSender.sendMail({
            to: email,
            subject: 'new items',
            html: send[email].map(toHtml).join('<hr/>')
        }, function(err, info) {
            if (err) {
                console.log('error sending mail to ', email);
                console.log(err);
            } else {
                console.log(info);
            }
        })
    })
    console.log('i should send to ', Object.keys(send));
}


function toHtml(item) {
    if (item.comment) {
        return '<p>' + item.comment.text + '<p><p><a href="">article</a></p>'
    } else {
        return '<h1>' + item.story.title + '</h1><p>' + item.story.text + '</p>'
    }

}
