var nodemailer = require('nodemailer'),
	config = require('../mailConfig.json');
    transporter = nodemailer.createTransport(config)

module.exports = transporter;