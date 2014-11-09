var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
    root: path.normalize(__dirname + '/..'),
    endpoints: {
        snippet_create: '/snippets',
        snippet_find: '/snippets/:id',
        snippet_update: '/snippets/:id', //za semantika
        snippet_list: '/snippets', //za semantika
        snippet_delete: '/snippets/:id', //za semantika
        snippet_list_by_creator: '/:creator/snippets'
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
