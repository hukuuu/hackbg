var mongoose = require('mongoose'),
Contact = mongoose.model('Contact'),
Group = mongoose.model('Group'),
Levenshtein = require('levenshtein')



var makeMatcher = function(str) {
  return function(s) {
    return new Levenshtein(str, s.groupName) < 3
  }
}

var add = function(contact) {
  var tokens = contact.personIdentifier.split(' ')
  Group.find({}, function(err, groups) {
    tokens.forEach(function(token) {
      var group = groups.filter(makeMatcher(token))[0]
      if(group) {
        group.contacts.push(contact)
      } else {
        group = new Group({
          groupName: token,
          contacts: [contact]
        })
      }
      group.save()
    })
  })
}

var list = function(req, res) {
  Group.find({}, function(err, groups) {
    if(err)
      return res.status(400).send(err).end()
    else
      return res.status(200).send(groups).end()

  })
}

module.exports = {
  add: add,
  list: list
}
