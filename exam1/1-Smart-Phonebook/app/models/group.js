var mongoose = require('mongoose'), 
Schema = mongoose.Schema, 
Contact = mongoose.model('Contact').schema

var GroupSchema = new Schema({ 
  groupName: String, 
  type: String,
  contacts: [Contact]
}); 

mongoose.model('Group', GroupSchema); 
