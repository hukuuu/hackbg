var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var GraphSchema = new Schema({
  username: String,
  depth: Number
});

mongoose.model('Graph', GraphSchema);
