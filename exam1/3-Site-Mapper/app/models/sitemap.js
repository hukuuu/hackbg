var mongoose = require('mongoose'), 
Schema = mongoose.Schema 

var SitemapSchema = new Schema({ 
  status: {
    type: String,
    default: 'currently crawling'
  },
  sitemap: [{
    url: String,
    links: [String]
  }]
}); 

mongoose.model('Sitemap', SitemapSchema); 
