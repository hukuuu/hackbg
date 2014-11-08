var MongoClient = require('mongodb').MongoClient,
url = require('./mongoConfig.json').mongoConnectionUrl,
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

Db.prototype.findAllWords = function(first, howMany) {
  var defered = q.defer()
  var me = this
  var rank = first

  var group = {
    $group:{
      _id:{
        word:"$word"
      },
      count:{
        $sum:1
      }
    }
  },
  sort = {
    $sort:{
      count:-1
    }
  },
  skip = {
    $skip: first > 0 ? (first-1) : 0
  },
  limit = {
    $limit: howMany || 0
  }

  this.init()
  .then(function() {
    var words = me.db.collection('words')
    words.aggregate([,, ,], function(err, res) {
      if(err)
        defered.reject(err)
      else
        defered.resolve(res.map(function(item){
          return {
            rank: rank++,
            keyword: item._id.word,
            count: item.count
          }
        }))
    })
  })
  .fail(function(err) {
    defered.reject(err)
  })
  return defered.promise
};


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
    }, function(err, dbMax) {
      if (err) {
        defered.reject(err)
      } else {
        if(!dbMax) {
          defered.resolve(1)
          max.insert({max:'max',count:1},function() {
          })
        } else {
          defered.resolve(dbMax.count)
        }
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
