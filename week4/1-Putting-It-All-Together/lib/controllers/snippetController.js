var mongoose = require('mongoose'),
Snippet = mongoose.model('Snippet'),
extend = require('extend')


var onError = function(status, res, err) {
  res.status(status)
  .json(err)
  .end()
}
var find = function(id, cb) {
  Snippet.find({_id: id}, function(err, docs){
    if(err) {
      cb(err)
    } else if(docs.length === 0) {
      cb(404)
    } else {
      cb(null, docs[0])
    }
  })
}

module.exports = {
  create: function(req, res) {
    var snippet = new Snippet(req.body)
    snippet.validate(function(err) {
      if (err) {
        onError(400, res, err)
      } else {
        snippet.save(function(err, saved) {
          if (err) {
            onError(400, res, err)
          } else {
            res.send(saved).status(200).end()
          }
        })
      }

    })
  },
  find: function(req, res) {
    var id = req.param('id')
    find(id,function(err, snippet){
      if(err) {
        onError(404, res, err)
      } else {
        res.json(snippet).end()
      }
    })
  },
  update: function(req, res) {
    var id = req.param('id')
    find(id,function(err, snippet){
      if(err) {
        onError(404, res, err)
      } else {
        extend(snippet, req.body)
        snippet.save()
        res.json(snippet).end()
      }
    })
  },
  list: function(req, res) {
    Snippet.find({},function(err, docs){
      if(err) {
        onError(400, res, err)
      }
      else {
        res.json(docs).end()
      }
    })
  },
  delete: function(req, res) {
    var id = req.param('id')
    find(id, function(err, snippet){
      if(err) {
        onError(404, res, 'could not find snippet with id: ' + id)
      } else {
        snippet.remove()
        res.status(200).end()
      }

    })
  }
};




