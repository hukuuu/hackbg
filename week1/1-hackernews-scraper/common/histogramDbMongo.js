var MongoClient = require('mongodb').MongoClient,
    url = require('../mongoConfig.json').mongoConnectionUrl,
    q = require('q');



function Db() {}

Db.prototype.init = function() {
    var defered = q.defer()
    var me = this

    if (this.db) {
        defered.resolve()
    } else {
        MongoClient.connect(url, function(err, db) {
            if (err) {
                defered.reject(err)
            } else {
                console.log('connected to db');
                me.db = db
                defered.resolve()
            }
        })
    }
    return defered.promise;
};

Db.prototype.addWords = function(keywords) {
    var defered = q.defer()
    var me = this
    var kws = keywords.map(function(word) {
        return {
            word: word
        }
    });
    if(kws.length === 0)
        defered.resolve()

    this.init()
        .then(function() {
            var words = me.db.collection('words')
            words.insert(kws,
                function(err, result) {
                    if (err) {
                        defered.reject(err)
                    } else {
                        defered.resolve(result)
                    }
                })
        })
        .fail(function(err) {
            defered.reject(err)
        })

    return defered.promise
};

Db.prototype.addWord = function(word) {
    var defered = q.defer()
    var me = this
    this.init()
        .then(function() {
            var words = me.db.collection('words')
            words.insert({
                word: word
            }, function(err, result) {
                if (err)
                    defered.reject(err)
                else defered.resolve(result)
            })
        })
        .fail(function(err) {
            defered.reject(err)
        })
    return defered.promise
};

Db.prototype.findAllWords = function() {
    var defered = q.defer()
    var me = this
    this.init()
        .then(function() {
            var words = me.db.collection('words')
            words.find().toArray(function(err, result) {
                if (err) {
                    defered.reject(err)
                } else {
                    defered.resolve(result)
                }
            })
        })
        .fail(function(err) {
            defered.reject(err)
        })
    return defered.promise
}
Db.prototype.setMaxIndex = function(index) {
    var defered = q.defer()
    var me = this
    this.init()
        .then(function() {
            var max = me.db.collection('max')
            max.update({
                max: 'max'
            }, {
                $set: {
                    count: index
                }
            }, function(err, res) {
                if (err) {
                    defered.reject(err)
                } else {
                    defered.resolve(res)
                }
            })
        })
        .fail(function(err) {
            defered.reject(err)
        })

    return defered.promise
};
Db.prototype.getMaxIndex = function() {
    var defered = q.defer()
    var me = this
    this.init()
        .then(function() {
            var max = me.db.collection('max')
            max.findOne({
                max: 'max'
            }, function(err, max) {
                if (err) {
                    defered.reject(err)
                } else {
                    defered.resolve(max && (max.count || 0) || 0)
                }
            })
        })
        .fail(function(err) {
            defered.reject(err)
        })

    return defered.promise
};

function init() {
    var db = new Db()
    db.init()
    return db
}

module.exports = init();
