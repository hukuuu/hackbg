var select = require('soupselect'),
htmlparser = require('htmlparser2'),
request = require('request'),
_ = require('highland')

var parser, feed;

var linkStream = _(function(push, next) {
  parser = new htmlparser.Parser({
    onopentag: function(name, attribs) {
      if(name === 'a')
        push(null, attribs.href)
    }
  })
  feed = function(chunk) {
    parser.write(chunk.toString())
  }

  _(request('http://www.reddit.com/'))
  .each(feed)
})


var links = []

linkStream
.each(_.log)
.reduce(links, function(all, current) {
  return all.concat(current)
})

