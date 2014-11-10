var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
    root: path.normalize(__dirname + '/..'),
    endpoints: {
      graph_create: '/createGraphFor',
      graph_find: '/graphs/:graphId',
      graph_mutually_follow: '/mutually_follow/:graphId/:username'
    }
};

/**
 * Expose
 */

module.exports = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];
