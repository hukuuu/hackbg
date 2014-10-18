var db = require('../common/articleDb'),
    https = require('https'),
    http = require('http'),
    request = require("request"),
    maxItemUrl = 'https://hacker-news.firebaseio.com/v0/maxitem.json',
    articleUrl = 'https://hacker-news.firebaseio.com/v0/item/',
    notifier = {
        host: '0.0.0.0',
        port: 3001,
        path: '/newArticles',
        method: 'POST'
    }

setInterval(function() {
	console.log('pinging site');
    https.get(maxItemUrl, function(res) {
        var payload = ''
        res.on('data', function(chunk) {
            payload += chunk.toString();
        });
        res.on('end', function() {
            console.log(payload);
            handleDiff(payload, db.getMax())
        })
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}, 1000 * 30)

function handleDiff(current, dbMax) {
    var diff = current - dbMax,
        ids = [];
    while (dbMax <= current) {
        ids.push(++dbMax)
    }

    fetch(ids, function(items) {
        var notify = false
        items.forEach(function(item) {
            if (item) {
                console.log(item['type']);
                if (item['type'] === 'story') {
                    db.addArticle(item)
                    notify = true
                }

            }
        })
        db.setMax(current) //for testing
        if (notify) {
            request({
                uri: "http://localhost:3001/newArticles",
                method: "POST"
            }, function(error, response, body) {
                console.log('notifier should update');
            });

        }
    })

    console.log('ids: ', ids);
}

function fetch(ids, cb) {
    var max = ids.length
    var items = []
    ids.forEach(function(id) {
        https.get(articleUrl + id + '.json', function(res) {
            var payload = ''
            res.on('data', function(chunk) {
                payload += chunk.toString();
            });
            res.on('end', function() {
                var article = JSON.parse(payload)
                console.log(article);
                if (article) {
                    article.new = true
                }
                items.push(article)
                if (items.length === max) {
                    cb(items)
                }
            })
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
    })
}
