var monochrome = require('./monochrome.js')


process.on('message', function(message){ 
  var method = message.method
  var params = message.params
  var result = monochrome[method].apply(monochrome, params)
  process.send(result)
})
