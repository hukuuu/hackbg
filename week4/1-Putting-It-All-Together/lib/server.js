var fs = require('fs'),
    mongoose = require('mongoose'),
    express = require('express'),
    config = require('./config/config.js');


var app = express()
var port = process.env.PORT || 3000

var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    }
    mongoose.connect(config.db, options)
}
connect()

mongoose.connection.on('error', console.log.bind(console))
mongoose.connection.on('disconnected', connect)

//models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
	if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
})

require('./config/express')(app)

require('./config/routes')(app)


app.listen(port, function() {
    console.log('listening on ' + port);
})
