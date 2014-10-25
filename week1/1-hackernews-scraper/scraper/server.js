var itemDb = require('../common/itemDb'),
    https = require('https'),
    http = require('http'),
    request = require("request"),
    hnApi = require('../common/hnApi.js'),
    async = require('async'),
    config = require('../config.json');



(function forever() {
    console.log('***SEARCH TIME***');
    hnApi.getMaxItem(function(err, item) {
        if (err)
            console.log('error occured: ', err);
        else {
            var ids = findIds(item, itemDb.getMaxIndex())
            async.map(ids, scrapeItem, function(err, items) {
                if (err)
                    console.log('fuck')
                else if(items.length > 0) {
                    console.log('save to notify ', items.length);
                    itemDb.addItems(items)
                    itemDb.setMaxIndex(item) //todo
                    callNotifier()
                } else {
                    console.log('no items');
                }
                setTimeout(forever, 1 * 30 * 1000)
            })
        }
    })
})();

// setInterval(function() {

// }, 1000 * 30)

function callNotifier() {
    request({
        url: 'http://localhost:' + config.notifier.port + config.notifier.path,
        method: config.notifier.method
    }, function(err, res, body) {
        //ne me ebe
    })
}

function scrapeItem(id, cb) {
    console.log('scraping ', id);
    hnApi.getItem(id, function(err, item) {
        if (err)
            cb(err)
        else {
            handleItem(item, cb)
        }
    })
}

function handleItem(item, cb) {
    if (item.type === 'story') {
        cb(null, {
            story: item
        })
    } else if (item.type === 'comment') {
        hnApi.findStory(item, function(err, story) {
            if (err)
                cb(err)
            else
                cb(null, {
                    story: story,
                    comment: item
                })
        })
    }
}

function findIds(max, current) {
    var ids = []
    while (current < max)
        ids.push(++current)
    return ids
}
