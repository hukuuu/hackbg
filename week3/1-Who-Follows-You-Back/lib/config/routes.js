var mongoose = require('mongoose'),
config = require('./config.js'),
graph = require('../controllers/graphController.js');


module.exports = function(app) {

  app.post(config.endpoints.graph_create, graph.create)
  app.get(config.endpoints.graph_find, graph.find)

  //error handling
  app.use(function(err, req, res, next) {
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500)
    res.end()
  });

  // assume 404 since no middleware responded
  app.use(function(req, res, next) {
    res.status(404)
    res.end()
  });
}
