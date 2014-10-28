var db = require('../../week1/1-hackernews-scraper/common/histogramDbMongo.js')


db.addWord('foo')
    .then(function() {
        db.findAllWords()
            .then(function(words) {
                console.log(words);
            })
            .fail(function(err) {
                console.log(err);
            })

    })
