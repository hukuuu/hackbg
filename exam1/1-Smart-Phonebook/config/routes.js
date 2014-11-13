var mongoose = require('mongoose');
var config = require('../config/config.js')
var contacts = require('../app/controllers/contactsController.js')
var groups = require('../app/controllers/groupsController.js')

module.exports = function (app, passport) {

  app.post(config.endpoints.contact_create, contacts.create)
  app.get(config.endpoints.contact_list, contacts.list)
  app.get(config.endpoints.contact_find, contacts.find)
  app.delete(config.endpoints.contact_remove, contacts.remove)
  
  app.get(config.endpoints.group_list, groups.list)

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).send(err).end()
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).end()
  });
};
