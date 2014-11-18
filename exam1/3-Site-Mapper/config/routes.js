var mongoose = require('mongoose');
var config = require('../config/config.js')
var sitemapController = require('../app/controllers/sitemapController.js')

module.exports = function (app, passport) {

  app.post(config.endpoints.sitemap_create, sitemapController.create)
  app.get(config.endpoints.sitemap_find, sitemapController.find)

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
