var mongoose = require('mongoose'),
Contact = mongoose.model('Contact')
extend = require('extend'),
groups = require('./groupsController.js')




var create = function(req, res) {
  var contact = new Contact(req.body)
  contact.save(function(err, saved) {
    if(err)
      return res.status(400).send(err).end()
    else {
      groups.add(saved)
      return res.status(200).send(saved).end()
    }
  })
}

var list = function(req, res) {
  Contact.find(function(err, contacts) {
    if(err)
      return res.status(400).send(err).end()
    else
      return res.status(200).send(contacts).end()
  })
}

var find = function(req, res) {
  var id = req.param('contactId')
  Contact.find({_id:id}, function(err, contact) {
    if(err)
      return res.status(400).send(err).end()
    else if (!contact || !contact[0])
      return res.status(404).end()
    else
      return res.status(200).send(contact[0]).end()
  })
}

var remove = function(req, res) {
  var id = req.param('contactId')
  Contact.remove({_id:id}, function(err) {
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
