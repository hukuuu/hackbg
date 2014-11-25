var argv = require('optimist').argv
var fs = require('fs')
var _ = require('highland')


var size = argv.size
var writeStream = fs.createWriteStream(argv.output)


var numberSource = _(function(push, next) {
  var number, bytes = 0
  var id = setInterval(function() {
    number = Math.round(Math.random() * 255)
    push(null, number)
    bytes+=3;
    if(bytes > size) {
      clearInterval(id)
      return;
    }
  }, 0)
})

function dvepetpet(val) { return val === 255}
function concatComma(val) { return val + ', '}
function makeNewLineDivider(max) {
  var size = 0
  return function(val) {
    if(++size > max) {
      size = 0;
      return val + '\n'; 
    }
    else
      return val
  }
}

numberSource
 // .filter(dvepetpet)
  .map(concatComma)
  .map(makeNewLineDivider(20))
//  .pipe(process.stdout)
  .pipe(writeStream)
numberSource.resume()


