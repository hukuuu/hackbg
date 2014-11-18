var robots = require('robots'),
select = require('soupselect').select,
htmlparser = require('htmlparser'),
http = require('http')


var handler = new htmlparser.DefaultHandler(function(error, dom){
  if(error) {
    return console.log(error)
  } else {
    console.log('we go dom: ', typeof dom)
  }
})
var parser = new htmlparser.Parser(handler)


function build(sitemap) {
  var root = sitemap.sitemap[0].url 
  http.request({
    host: 'www.reddit.com',
    port: 80,
    method: 'GET',
    path: '/'
  }, function(res) {
    var body = ''
    res.on('data', function(data) {
      body += data
    })
    res.on('end', function() {
      parser.parseComplete(body)
    })
  })
}

function getLinks(root) {

}





module.exports = {
  build: build
}
