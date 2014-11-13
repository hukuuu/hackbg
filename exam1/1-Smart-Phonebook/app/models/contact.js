var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
  phoneNumber: Number,
  personIdentifier: String
});

mongoose.model('Contact', ContactSchema);
