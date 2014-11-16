var q = require('q'),
cp = require('child_process')

function callIt(path, method) {
  var defered = q.defer()
  var worker = cp.fork(path)
  return function() {
    worker.on('message', function(e) {
      defered.resolve(e)
      worker.kill('SIGINT')
    })
    worker.send({
      method: method,
      params: Array.prototype.slice.call(arguments)
    })
    return defered.promise
  }
}

module.exports = {
  monochrome: {
    applyKernel: callIt('./lib/monochromeWorker.js', 'applyKernel'),
    edgeDetection: callIt('./lib/monochromeWorker.js', 'edgeDetection'),
    boxBlur: callIt('./lib/monochromeWorker.js', 'boxBlur')
  },
  rgb: {
    applyKernel: callIt('./lib/rgbWorker.js', 'applyKernel'),
    edgeDetection: callIt('./lib/rgbWorker.js', 'edgeDetection'),
    boxBlur: callIt('./lib/rgbWorker.js', 'boxBlur')
  }
}




