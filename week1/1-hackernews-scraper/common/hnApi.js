var request = require('request'),
    request = require("request"),
    maxItemUrl = 'https://hacker-news.firebaseio.com/v0/maxitem.json',
    itemUrl = 'https://hacker-news.firebaseio.com/v0/item/',
    async = require('async')

function commonHandler(cb) {
    return function(err, response, body) {
        if (!err && response.statusCode == 200) {
            return cb(null, body)
        } else {
            return cb(err || response)
        }
    }
}

function getMaxItem(cb) {
    request.get(maxItemUrl, commonHandler(cb))
}

function getItem(id, cb) {
    request.get({
        url: itemUrl + id + '.json',
        json: true
    }, commonHandler(cb))
}

function findStory(comment, cb) {
    var item = comment

    function isStory(item) {
        return item.type === 'story'
    }
    async.whilst(function() {
        return !isStory(item)
    }, function(cb) {
        getItem(item.parent, function(err, parent) {
            if (parent) {
                console.log(comment.id + '(comment) - ' + parent.id + ' - (' + parent.type + ')');
                item = parent
                cb()
            }
        })
    }, function() {
        cb(null, item)
    })
}


module.exports = {
    getMaxItem: getMaxItem,
    getItem: getItem,
    findStory: findStory
};
