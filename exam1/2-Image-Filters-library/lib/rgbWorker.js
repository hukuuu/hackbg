var rgb = require('./rgb.js')


process.on('message', function(message){ 
  var method = message.method
  var params = message.params
  var result = rgb[method].apply(rgb, params)
  process.send(result)
})
