var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SnippetSchema = new Schema({
  language: { type: String, required: true },
  filename: { type: String, required: true },
  code: { type: String, required: true },
  creator: { type: String, required: true }
});

mongoose.model('Snippet', SnippetSchema);