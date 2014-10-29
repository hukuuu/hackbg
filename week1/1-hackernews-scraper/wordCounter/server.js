var histogramDb = require('../common/histogramDbMongo'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    config = require('../config.json'),
    hnApi = require('../common/hnApi'),
    async = require('async')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/keywords', function(req, res) {
    histogramDb.findAllWords()
        .then(function(words) {
            res.json(words.map(function(word,i) {
                return {
                    word: word._id.word,
                    count: word.count,
                    rank:i
                }
            }))
        })
        .fail(res.end)
})


function forever() {
    var keywords

    histogramDb.getMaxIndex()
        .then(function(lastItemId) {
            console.log(lastItemId);
            hnApi.getItem(lastItemId, function(err, item) {
                if (err)
                    console.log(err);
                else {
                    keywords = getKeywords(item)
                    histogramDb.addWords(keywords)
                        .then(function() {
                            console.log(lastItemId + 1);
                            histogramDb.setMaxIndex(lastItemId + 1)
                                .then(function() {
                                    setTimeout(forever, 5000)
                                })
                        })
                        .fail(console.log.bind(console))
                }
            })
        })
        .fail(console.log.bind(console))

}

function getKeywords(item) {
    var kws = []
    if (!item) {
        console.log(kws);
        return kws
    }

    if (item.type === 'story') {
        if (item.title)
            kws = kws.concat(item.title.split(' '))
        if (item.text)
            kws = kws.concat(item.text.split(' '))
    } else if (item.text) {
        kws = kws.concat(item.text.split(' '))
    }

    console.log(kws);
    return kws
}

forever();

var server = app.listen(config.wordCounter.port, function() {
    console.log('WordCounter listening on http://localhost:' + config.wordCounter.port)
})
