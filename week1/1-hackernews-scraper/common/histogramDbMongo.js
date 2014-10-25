var MongoClient = require('mongodb').MongoClient,
    url = require('../mongoConfig.json').mongoConnectionUrl,
    fs = require('fs')



function Db() {}

Db.prototype.init = function(cb) {
    var me = this
    if (this.db)
        cb()
    else
        MongoClient.connect(url, function(err, db) {
            if (err)
                return console.log(err);
            else {
                console.log('connected to db');
                me.db = db
                cb()
            }
        })

};

Db.prototype.addWord = function(word, cb) {
    var words = this.db.collection('words')
    words.insert({
        word: word
    },cb)
};
