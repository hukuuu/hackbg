var mongoose = require('mongoose'),
Sitemap = mongoose.model('Sitemap'),
extend = require('extend'),
sitemapService = require('../services/sitemapService.js')



var create = function(req, res) {
  var sitemap = new Sitemap({
    sitemap: [{
      url: req.body.url,
      links: []
    }]
  })
  sitemap.save(function(err, saved) {
    if(err)
      return res.status(400).send(err).end()
    else {
      sitemapService.build(saved)
      return res.status(200).send(saved).end()
    }
  })
}

var list = function(req, res) {
  Sitemap.find(function(err, contacts) {
    if(err)
      return res.status(400).send(err).end()
    else
      return res.status(200).send(contacts).end()
  })
}

var find = function(req, res) {
  var id = req.param('id')
  Sitemap.find({_id:id}, function(err, sitemap) {
    if(err)
      return res.status(400).send(err).end()
    else if (!sitemap || !sitemap[0])
      return res.status(404).end()
    else
      return res.status(200).send(sitemap[0]).end()
  })
}

var remove = function(req, res) {
  var id = req.param('id')
  Sitemap.remove({_id:id}, function(err) {
    if(err)
      return res.status(400).send(err).end()
    else
      return res.status(200).end()
  })
}

module.exports = {
  create: create,
  list: list,
  find: find,
  remove: remove
}
