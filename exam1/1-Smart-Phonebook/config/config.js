
/**
 * Module dependencies.
 */

var path = require('path');
var extend = require('util')._extend;

var development = require('./env/development');
var test = require('./env/test');
var production = require('./env/production');

var defaults = {
  root: path.normalize(__dirname + '/..'),
  endpoints: {
    contact_create: '/contacts',
    contact_list: '/contacts',
    contact_find: '/contacts/:contactId',
    contact_remove: '/contacts/:contactId',
    group_list: '/groups'
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
