
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config.js');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {
  // bodyParser should be above methodOverride
  app.use(bodyParser());
};
