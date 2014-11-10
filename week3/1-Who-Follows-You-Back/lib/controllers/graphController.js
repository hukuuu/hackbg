var mongoose = require('mongoose'),
Graph = mongoose.model('Graph'),
extend = require('extend'),
api = require('../lib/githubApi/api.js')


var onError = function(status, res, err) {
  res.status(status)
  .json(err)
  .end()
}
var find = function(id, cb) {
  Graph.find({_id: id}, function(err, docs){
    if(err) {
      cb(err)
    } else if(docs.length === 0) {
      cb('graph not found')
    } else {
      cb(null, docs[0])
    }
  })
}
var buildData = function(graph) {
}

module.exports = {
  create: function(req, res) {
    var graph = new Graph(req.body)
    graph.save(function(err, saved) {
      if (err) {
        onError(400, res, err)
      } else {
        buildData(saved)
        res.send(saved._id).status(200).end()
      }
    })
  },
  find: function(req, res) {
    var id = req.param('graphId')
    find(id,function(err, snippet){
      if(err) {
        res.status(404).send('graph not found').end()
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
    Graph.find({},function(err, docs){
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
  },
  listByCreator: function(req, res) {
    var creator = req.param('creator')
    Graph.find({creator:creator}, function(err, docs){
      if(err) {
        onError('400', res, err)
      } else {
        res.json(docs).end()
      }
    })
  }
};




