var mongoose = require('mongoose'),
    config = require('./config.js'),
    snippet = require('../controllers/snippetController.js');


module.exports = function(app) {

    app.post(config.endpoints.snippet_create, snippet.create)


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
